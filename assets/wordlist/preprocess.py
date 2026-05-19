#!/usr/bin/env nix-shell
#! nix-shell -i python3 -p "python3.withPackages (ps: with ps; [ pykakasi ])"

import json
import re
from functools import lru_cache
from collections import defaultdict, Counter
from pathlib import Path
from pykakasi import kakasi

IN = Path('./wordlist.json')
OUT = Path('./wordlist_processed.json')
REPORT = Path('./wordlist_chars_report.json')
REMOVE_KEYS = {
    'appearance', 'subActivity', 'activity', 'lesson', 'section',
    'partsOfSpeech', 'wordListIndex', 'alphabeticalIndex', 'extraInfo'
}
SMALL = set('ぁぃぅぇぉゃゅょゎァィゥェォャュョヮ')
SOKUON = set('っッ')
KANA_RE = re.compile(r'[\u3040-\u30ff]')
KANJI_RE = re.compile(r'[\u3400-\u4dbf\u4e00-\u9fff々〆ヶ]')
DIGIT_RE = re.compile(r'[0-9０-９,，]+')
LATIN_RE = re.compile(r'[A-Za-z]+')

LETTER_READINGS = {
    'A': ['エー'], 'B': ['ビー'], 'C': ['シー'], 'D': ['ディー'],
    'E': ['イー','エー'], 'F': ['エフ'], 'G': ['ジー'], 'H': ['エイチ'],
    'I': ['アイ'], 'J': ['ジェー'], 'K': ['ケー'], 'L': ['エル'],
    'M': ['エム'], 'N': ['エヌ'], 'O': ['オー'], 'P': ['ピー'],
    'Q': ['キュー'], 'R': ['アール'], 'S': ['エス'], 'T': ['ティー'],
    'U': ['ユー'], 'V': ['ブイ'], 'W': ['ダブリュー'], 'X': ['エックス'],
    'Y': ['ワイ'], 'Z': ['ゼット'],
}
DIGIT_READINGS = {
    '0': ['ゼロ','れい'], '０': ['ゼロ','れい'],
    '1': ['いち'], '１': ['いち'],
    '2': ['に'], '２': ['に'],
    '3': ['さん'], '３': ['さん'],
    '4': ['よん','し'], '４': ['よん','し'],
    '5': ['ご'], '５': ['ご'],
    '6': ['ろく'], '６': ['ろく'],
    '7': ['なな','しち'], '７': ['なな','しち'],
    '8': ['はち'], '８': ['はち'],
    '9': ['きゅう','く'], '９': ['きゅう','く'],
}

def is_kana_char(c):
    return '\u3040' <= c <= '\u30ff'

def is_kana_unit(u):
    return all(is_kana_char(c) for c in u)

def is_kanji_char(c):
    return bool(KANJI_RE.fullmatch(c))

def is_literal(u):
    if is_kana_unit(u):
        return True
    if all((not is_kanji_char(c)) and (not c.isalnum()) and c not in ',，' for c in u):
        return True
    return False

def segment_word(s):
    s = str(s)
    out = []
    i = 0
    while i < len(s):
        c = s[i]
        # number run, including separators inside the run
        if c.isdigit() or c in ',，':
            j = i + 1
            while j < len(s) and (s[j].isdigit() or s[j] in ',，'):
                j += 1
            out.append(s[i:j])
            i = j
            continue
        # Latin: split all-uppercase acronyms, keep mixed/lower words together.
        if ('A' <= c <= 'Z') or ('a' <= c <= 'z'):
            j = i + 1
            while j < len(s) and (('A' <= s[j] <= 'Z') or ('a' <= s[j] <= 'z')):
                j += 1
            run = s[i:j]
            if run.isupper():
                out.extend(list(run))
            else:
                out.append(run)
            i = j
            continue
        # Japanese kana mora-ish grouping: ちょ, ティー, っと, ップ, etc.
        if c in SOKUON and i + 1 < len(s) and is_kana_char(s[i + 1]):
            j = i + 2
            if j < len(s) and s[j] in SMALL:
                j += 1
            while j < len(s) and s[j] == 'ー':
                j += 1
            out.append(s[i:j])
            i = j
            continue
        if is_kana_char(c):
            j = i + 1
            if j < len(s) and s[j] in SMALL:
                j += 1
            while j < len(s) and s[j] == 'ー':
                j += 1
            out.append(s[i:j])
            i = j
            continue
        out.append(c)
        i += 1
    return out

def entry_word(x):
    return ''.join(e if isinstance(e, str) else str(e.get('word','')) for e in x)

def entry_reading(x):
    return ''.join(e if isinstance(e, str) else str(e.get('reading','')) for e in x)

def object_entry(word, reading):
    return {'word': word, 'reading': reading}

ROMANIZER = kakasi()

def romanize_reading(reading):
    reading = str(reading)
    parts = []
    for item in ROMANIZER.convert(reading):
        text = item.get('orig', '')
        hepburn = item.get('hepburn', '')
        if text == '／':
            parts.append(' / ')
        elif text.isspace():
            parts.append(' ')
        elif hepburn:
            parts.append(hepburn)
        else:
            parts.append(text)
    return ''.join(parts).replace('  ', ' ').strip()

def is_empty_value(value):
    return not str(value or '').strip()

def candidate_list(unit, candidates):
    vals = []
    if unit in candidates:
        for r, n in candidates[unit].most_common():
            vals.append((r, 200 + min(n, 20)))
    if unit in LETTER_READINGS:
        for r in LETTER_READINGS[unit]:
            vals.append((r, 180))
    if unit in DIGIT_READINGS:
        for r in DIGIT_READINGS[unit]:
            vals.append((r, 120))
    # Remove duplicates, keep best score.
    best = {}
    for r, s in vals:
        best[r] = max(best.get(r, -9999), s)
    return sorted(best.items(), key=lambda x: (-x[1], -len(x[0]), x[0]))

def split_run(run, segment, candidates):
    # No arbitrary split if there is no known anchor/candidate inside the run.
    has_known = any(candidate_list(u, candidates) for u in run)
    if len(run) == 1 or not has_known:
        return ([object_entry(''.join(run), segment)], 0 if len(run) == 1 else -80)

    n = len(run)
    @lru_cache(None)
    def dp(i, j):
        if i == n:
            return ([], 0) if j == len(segment) else None
        u = run[i]
        best = None
        # Known readings first.
        for cand, base_score in candidate_list(u, candidates):
            if segment.startswith(cand, j):
                rest = dp(i + 1, j + len(cand))
                if rest is not None:
                    entries, score = rest
                    res = ([object_entry(u, cand)] + entries, score + base_score)
                    if best is None or res[1] > best[1]:
                        best = res
        # Bounded unknown fallback. Needed for readings inferred from a known neighbor.
        # Avoid for multi-character numeric or mixed Latin units.
        remaining_units = n - i - 1
        max_len = min(len(segment) - j, 8)
        if max_len > 0 and not (len(u) > 1 and (u[0].isdigit() or u[0] in ',，')):
            # Leave at least one kana/codepoint for each following unit when possible.
            for k in range(1, max_len + 1):
                if len(segment) - (j + k) < remaining_units:
                    continue
                rest = dp(i + 1, j + k)
                if rest is not None:
                    entries, score = rest
                    res = ([object_entry(u, segment[j:j+k])] + entries, score - 10 * k)
                    if best is None or res[1] > best[1]:
                        best = res
        return best
    result = dp(0, 0)
    if result is None:
        return ([object_entry(''.join(run), segment)], -80)
    return result

def align(units, reading, candidates):
    n = len(units)
    @lru_cache(None)
    def dp(i, j):
        if i == n:
            if j == len(reading):
                return ([], 0)
            return None
        u = units[i]
        if is_literal(u):
            # Normal exact literal/kana match.
            if reading.startswith(u, j):
                rest = dp(i + 1, j + len(u))
                if rest is not None:
                    entries, score = rest
                    return ([u] + entries, score + 10)
            # Some source words have trailing spaces absent from reading.
            if u.isspace():
                rest = dp(i + 1, j)
                if rest is not None:
                    entries, score = rest
                    return ([object_entry(u, '')] + entries, score - 5)
            return None

        # Collect variable run.
        m = i
        while m < n and not is_literal(units[m]):
            m += 1
        run = tuple(units[i:m])
        best = None
        # Try all possible reading endpoints. Prefer endpoints that allow the suffix to align.
        for end in range(j, len(reading) + 1):
            rest = dp(m, end)
            if rest is None:
                continue
            run_entries, run_score = split_run(list(run), reading[j:end], candidates)
            entries, score = rest
            res = (run_entries + entries, score + run_score)
            if best is None or res[1] > best[1]:
                best = res
        return best
    result = dp(0, 0)
    if result is None:
        return [object_entry(''.join(units), reading)], -1000
    return result

def add_candidates_from_alignment(aligned, candidates):
    changed = 0
    for e in aligned:
        if isinstance(e, dict):
            w, r = e['word'], e['reading']
            # Learn one-kanji, one-letter, and one-token number readings only.
            if len(w) == 1 and r and not is_literal(w):
                before = candidates[w][r]
                candidates[w][r] += 1
                if before == 0:
                    changed += 1
    return changed

def make_initial_candidates(data):
    c = defaultdict(Counter)
    for k, vals in LETTER_READINGS.items():
        for v in vals:
            c[k][v] += 5
    for k, vals in DIGIT_READINGS.items():
        for v in vals:
            c[k][v] += 3
    # Direct one-character entries.
    for row in data:
        w, r = str(row.get('word', '')), str(row.get('reading', ''))
        if len(w) == 1 and w != r and r:
            c[w][r] += 10
    return c

def transform(data):
    candidates = make_initial_candidates(data)
    # Iteratively learn readings from anchored okurigana, particles, suffixes, etc.
    for _ in range(8):
        changed = 0
        for row in data:
            w, r = str(row.get('word', '')), str(row.get('reading', ''))
            aligned, _score = align(tuple(segment_word(w)), r, candidates)
            if entry_word(aligned) == w and entry_reading(aligned) == r:
                changed += add_candidates_from_alignment(aligned, candidates)
        if changed == 0:
            break

    out = []
    fallbacks = []
    grouped = []
    for idx, row in enumerate(data):
        w, r = str(row.get('word', '')), str(row.get('reading', ''))
        aligned, score = align(tuple(segment_word(w)), r, candidates)
        if entry_word(aligned) != w or entry_reading(aligned) != r:
            aligned = [object_entry(w, r)]
            fallbacks.append({'index': idx, 'word': w, 'reading': r, 'reason': 'alignment_failed'})
        for part in aligned:
            if isinstance(part, dict) and len(part['word']) > 1 and part['word'] != part['reading']:
                grouped.append({'index': idx, 'word': w, 'reading': r, 'group': part})
        new = {k: v for k, v in row.items() if k not in REMOVE_KEYS}
        # CHANGED: preserve schema by forcing top-level word/reading to strings.
        new['word'] = w
        new['reading'] = r
        if is_empty_value(new.get('romanization', '')):
            new['romanization'] = romanize_reading(r)
        # Insert chars after reading.
        ordered = {}
        for k, v in new.items():
            ordered[k] = v
            if k == 'reading':
                ordered['chars'] = aligned
        if 'chars' not in ordered:
            ordered['chars'] = aligned
        out.append(ordered)
    return out, candidates, fallbacks, grouped

def main():
    data = json.loads(IN.read_text(encoding='utf-8'))
    out, candidates, fallbacks, grouped = transform(data)
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    report = {
        'input_entries': len(data),
        'output_entries': len(out),
        'removed_keys': sorted(REMOVE_KEYS),
        'alignment_fallbacks': len(fallbacks),
        'grouped_non_identity_segments': len(grouped),
        'fallback_examples': fallbacks[:50],
        'grouped_examples': grouped[:100],
        'learned_single_unit_readings': sum(len(v) for v in candidates.values()),
    }
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    # Hard validation.
    for src, dst in zip(data, out):
        w, r = str(src.get('word','')), str(src.get('reading',''))
        assert entry_word(dst['chars']) == w, (w, dst['chars'], entry_word(dst['chars']))
        assert entry_reading(dst['chars']) == r, (r, dst['chars'], entry_reading(dst['chars']))
        for k in REMOVE_KEYS:
            assert k not in dst
    print(json.dumps(report, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    main()
