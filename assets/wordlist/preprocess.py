#!/usr/bin/env nix-shell
#! nix-shell -i python3 -p "python3.withPackages (ps: with ps; [ pykakasi ])"

from __future__ import annotations

import importlib
import json
import re
from collections import Counter, defaultdict
from collections.abc import Callable, Sequence
from functools import lru_cache
from pathlib import Path
from typing import Final, Protocol, TypeAlias, TypedDict, cast

IN: Final[Path] = Path('./wordlist.json')
OUT: Final[Path] = Path('./wordlist_processed.json')
REPORT: Final[Path] = Path('./wordlist_chars_report.json')

REMOVE_KEYS: Final[frozenset[str]] = frozenset({
    'appearance', 'subActivity', 'activity', 'lesson', 'section',
    'partsOfSpeech', 'wordListIndex', 'alphabeticalIndex', 'extraInfo',
})
SMALL: Final[frozenset[str]] = frozenset('ぁぃぅぇぉゃゅょゎァィゥェォャュョヮ')
SMALL_YOON: Final[frozenset[str]] = frozenset('ゃゅょャュョ')
SOKUON: Final[frozenset[str]] = frozenset('っッ')
KANJI_RE: Final[re.Pattern[str]] = re.compile(r'[\u3400-\u4dbf\u4e00-\u9fff々〆ヶ]')

LETTER_READINGS: Final[dict[str, list[str]]] = {
    'A': ['エー'], 'B': ['ビー'], 'C': ['シー'], 'D': ['ディー'],
    'E': ['イー', 'エー'], 'F': ['エフ'], 'G': ['ジー'], 'H': ['エイチ'],
    'I': ['アイ'], 'J': ['ジェー'], 'K': ['ケー'], 'L': ['エル'],
    'M': ['エム'], 'N': ['エヌ'], 'O': ['オー'], 'P': ['ピー'],
    'Q': ['キュー'], 'R': ['アール'], 'S': ['エス'], 'T': ['ティー'],
    'U': ['ユー'], 'V': ['ブイ'], 'W': ['ダブリュー'], 'X': ['エックス'],
    'Y': ['ワイ'], 'Z': ['ゼット'],
}
DIGIT_READINGS: Final[dict[str, list[str]]] = {
    '0': ['ゼロ', 'れい'], '０': ['ゼロ', 'れい'],
    '1': ['いち'], '１': ['いち'],
    '2': ['に'], '２': ['に'],
    '3': ['さん'], '３': ['さん'],
    '4': ['よん', 'し'], '４': ['よん', 'し'],
    '5': ['ご'], '５': ['ご'],
    '6': ['ろく'], '６': ['ろく'],
    '7': ['なな', 'しち'], '７': ['なな', 'しち'],
    '8': ['はち'], '８': ['はち'],
    '9': ['きゅう', 'く'], '９': ['きゅう', 'く'],
}

SourceRow: TypeAlias = dict[str, object]
OutputRow: TypeAlias = dict[str, object]
Candidates: TypeAlias = defaultdict[str, Counter[str]]
CandidateScore: TypeAlias = tuple[str, int]


class StringReadingEntry(TypedDict):
    word: str
    reading: str


class ArrayReadingEntry(TypedDict):
    word: str
    reading: list[str]


class FallbackExample(TypedDict):
    index: int
    word: str
    reading: str
    reason: str


class GroupedExample(TypedDict):
    index: int
    word: str
    reading: str
    group: StringReadingEntry


class KakasiItem(TypedDict, total=False):
    orig: str
    hepburn: str


class Romanizer(Protocol):
    def convert(self, text: str) -> list[KakasiItem]:
        ...


AlignmentEntry: TypeAlias = str | StringReadingEntry
ReadableEntry: TypeAlias = str | StringReadingEntry | ArrayReadingEntry
AlignmentResult: TypeAlias = tuple[list[AlignmentEntry], int]
TransformResult: TypeAlias = tuple[
    list[OutputRow],
    Candidates,
    list[FallbackExample],
    list[GroupedExample],
]


def make_romanizer() -> Romanizer:
    module = importlib.import_module('pykakasi')
    factory = cast(Callable[[], Romanizer], getattr(module, 'kakasi'))
    return factory()


ROMANIZER: Final[Romanizer] = make_romanizer()


def is_kana_char(c: str) -> bool:
    return '\u3040' <= c <= '\u30ff'


def is_kana_unit(u: str) -> bool:
    return all(is_kana_char(c) for c in u)


def is_kanji_char(c: str) -> bool:
    return bool(KANJI_RE.fullmatch(c))


def is_literal(u: str) -> bool:
    if is_kana_unit(u):
        return True
    return all((not is_kanji_char(c)) and (not c.isalnum()) and c not in ',，' for c in u)


def kana_unit_end(value: str, start: int) -> int:
    end = start + 1
    if end < len(value) and value[end] in SMALL:
        end += 1
    while end < len(value) and value[end] == 'ー':
        end += 1
    return end


def segment_word(value: object) -> list[str]:
    s = str(value)
    out: list[str] = []
    i = 0
    while i < len(s):
        c = s[i]
        if c.isdigit() or c in ',，':
            j = i + 1
            while j < len(s) and (s[j].isdigit() or s[j] in ',，'):
                j += 1
            out.append(s[i:j])
            i = j
            continue
        if ('A' <= c <= 'Z') or ('a' <= c <= 'z'):
            j = i + 1
            while j < len(s) and (('A' <= s[j] <= 'Z') or ('a' <= s[j] <= 'z')):
                j += 1
            run = s[i:j]
            if run.isupper():
                out.extend(run)
            else:
                out.append(run)
            i = j
            continue
        if c in SOKUON:
            j = i + 1
            if j < len(s) and is_kana_char(s[j]):
                j = kana_unit_end(s, j)
            out.append(s[i:j])
            i = j
            continue
        if is_kana_char(c):
            j = kana_unit_end(s, i)
            out.append(s[i:j])
            i = j
            continue
        out.append(c)
        i += 1
    return out


def entry_word(entries: Sequence[ReadableEntry]) -> str:
    return ''.join(e if isinstance(e, str) else e['word'] for e in entries)


def entry_reading(entries: Sequence[ReadableEntry]) -> str:
    parts: list[str] = []
    for e in entries:
        if isinstance(e, str):
            parts.append(e)
            continue
        reading = e['reading']
        if isinstance(reading, list):
            parts.append(''.join(reading))
        else:
            parts.append(reading)
    return ''.join(parts)


def object_entry(word: str, reading: str) -> StringReadingEntry:
    return {'word': word, 'reading': reading}


def segment_reading(value: object) -> list[str]:
    reading = str(value)
    out: list[str] = []
    i = 0
    while i < len(reading):
        c = reading[i]
        if c in SOKUON:
            j = i + 1
            if j < len(reading) and is_kana_char(reading[j]):
                j = kana_unit_end(reading, j)
            out.append(reading[i:j])
            i = j
            continue
        if is_kana_char(c):
            j = kana_unit_end(reading, i)
            out.append(reading[i:j])
            i = j
            continue
        out.append(c)
        i += 1
    return out


def output_chars(aligned: Sequence[AlignmentEntry]) -> list[ArrayReadingEntry]:
    entries: list[StringReadingEntry] = []
    for e in aligned:
        if isinstance(e, str):
            entries.append(object_entry(e, e))
        else:
            entries.append(e.copy())

    for i in range(1, len(entries)):
        previous = entries[i - 1]
        current = entries[i]
        if not previous['reading'] or not current['reading']:
            continue
        if current['reading'][0] not in SMALL_YOON:
            continue
        if not is_kana_char(previous['reading'][-1]) or previous['reading'][-1] in SMALL:
            continue

        previous['reading'] += current['reading'][0]
        current['reading'] = current['reading'][1:]

    return [{'word': e['word'], 'reading': segment_reading(e['reading'])} for e in entries]


def romanize_reading(reading: object) -> str:
    parts: list[str] = []
    for item in ROMANIZER.convert(str(reading)):
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


def is_empty_value(value: object) -> bool:
    return not str(value or '').strip()


def candidate_list(unit: str, candidates: Candidates) -> list[CandidateScore]:
    vals: list[CandidateScore] = []
    if unit in candidates:
        for reading, count in candidates[unit].most_common():
            vals.append((reading, 200 + min(count, 20)))
    if unit in LETTER_READINGS:
        for reading in LETTER_READINGS[unit]:
            vals.append((reading, 180))
    if unit in DIGIT_READINGS:
        for reading in DIGIT_READINGS[unit]:
            vals.append((reading, 120))
    best: dict[str, int] = {}
    for reading, score in vals:
        best[reading] = max(best.get(reading, -9999), score)
    return sorted(best.items(), key=lambda item: (-item[1], -len(item[0]), item[0]))


def split_run(run: Sequence[str], segment: str, candidates: Candidates) -> AlignmentResult:
    has_known = any(candidate_list(unit, candidates) for unit in run)
    if len(run) == 1 or not has_known:
        return [object_entry(''.join(run), segment)], 0 if len(run) == 1 else -80

    n = len(run)

    @lru_cache(maxsize=None)
    def dp(i: int, j: int) -> AlignmentResult | None:
        if i == n:
            return ([], 0) if j == len(segment) else None
        unit = run[i]
        best: AlignmentResult | None = None
        for candidate, base_score in candidate_list(unit, candidates):
            if segment.startswith(candidate, j):
                rest = dp(i + 1, j + len(candidate))
                if rest is not None:
                    entries, score = rest
                    result = [object_entry(unit, candidate), *entries], score + base_score
                    if best is None or result[1] > best[1]:
                        best = result
        remaining_units = n - i - 1
        max_len = min(len(segment) - j, 8)
        if max_len > 0 and not (len(unit) > 1 and (unit[0].isdigit() or unit[0] in ',，')):
            for k in range(1, max_len + 1):
                if len(segment) - (j + k) < remaining_units:
                    continue
                rest = dp(i + 1, j + k)
                if rest is not None:
                    entries, score = rest
                    result = [object_entry(unit, segment[j:j + k]), *entries], score - 10 * k
                    if best is None or result[1] > best[1]:
                        best = result
        return best

    result = dp(0, 0)
    if result is None:
        return [object_entry(''.join(run), segment)], -80
    return result


def align(units: Sequence[str], reading: str, candidates: Candidates) -> AlignmentResult:
    n = len(units)

    @lru_cache(maxsize=None)
    def dp(i: int, j: int) -> AlignmentResult | None:
        if i == n:
            return ([], 0) if j == len(reading) else None
        unit = units[i]
        if is_literal(unit):
            if reading.startswith(unit, j):
                rest = dp(i + 1, j + len(unit))
                if rest is not None:
                    entries, score = rest
                    return [unit, *entries], score + 10
            if unit.isspace():
                rest = dp(i + 1, j)
                if rest is not None:
                    entries, score = rest
                    return [object_entry(unit, ''), *entries], score - 5
            return None

        m = i
        while m < n and not is_literal(units[m]):
            m += 1
        run = units[i:m]
        best: AlignmentResult | None = None
        for end in range(j, len(reading) + 1):
            rest = dp(m, end)
            if rest is None:
                continue
            run_entries, run_score = split_run(run, reading[j:end], candidates)
            entries, score = rest
            result = [*run_entries, *entries], score + run_score
            if best is None or result[1] > best[1]:
                best = result
        return best

    result = dp(0, 0)
    if result is None:
        return [object_entry(''.join(units), reading)], -1000
    return result


def add_candidates_from_alignment(aligned: Sequence[AlignmentEntry], candidates: Candidates) -> int:
    changed = 0
    for entry in aligned:
        if isinstance(entry, str):
            continue
        word = entry['word']
        reading = entry['reading']
        if len(word) == 1 and reading and not is_literal(word):
            before = candidates[word][reading]
            candidates[word][reading] += 1
            if before == 0:
                changed += 1
    return changed


def make_initial_candidates(data: Sequence[SourceRow]) -> Candidates:
    candidates: Candidates = defaultdict(Counter)
    for key, values in LETTER_READINGS.items():
        for value in values:
            candidates[key][value] += 5
    for key, values in DIGIT_READINGS.items():
        for value in values:
            candidates[key][value] += 3
    for row in data:
        word = str(row.get('word', ''))
        reading = str(row.get('reading', ''))
        if len(word) == 1 and word != reading and reading:
            candidates[word][reading] += 10
    return candidates


def transform(data: Sequence[SourceRow]) -> TransformResult:
    candidates = make_initial_candidates(data)
    for _ in range(8):
        changed = 0
        for row in data:
            word = str(row.get('word', ''))
            reading = str(row.get('reading', ''))
            aligned, _score = align(tuple(segment_word(word)), reading, candidates)
            if entry_word(aligned) == word and entry_reading(aligned) == reading:
                changed += add_candidates_from_alignment(aligned, candidates)
        if changed == 0:
            break

    out: list[OutputRow] = []
    fallbacks: list[FallbackExample] = []
    grouped: list[GroupedExample] = []
    for index, row in enumerate(data):
        word = str(row.get('word', ''))
        reading = str(row.get('reading', ''))
        aligned, _score = align(tuple(segment_word(word)), reading, candidates)
        if entry_word(aligned) != word or entry_reading(aligned) != reading:
            aligned = [object_entry(word, reading)]
            fallbacks.append({
                'index': index,
                'word': word,
                'reading': reading,
                'reason': 'alignment_failed',
            })
        for part in aligned:
            if isinstance(part, str):
                continue
            if len(part['word']) > 1 and part['word'] != part['reading']:
                grouped.append({'index': index, 'word': word, 'reading': reading, 'group': part})

        new: OutputRow = {key: value for key, value in row.items() if key not in REMOVE_KEYS}
        new['word'] = word
        new['reading'] = reading
        if is_empty_value(new.get('romanization', '')):
            new['romanization'] = romanize_reading(reading)

        chars = output_chars(aligned)
        ordered: OutputRow = {}
        for key, value in new.items():
            ordered[key] = value
            if key == 'reading':
                ordered['chars'] = chars
        if 'chars' not in ordered:
            ordered['chars'] = chars
        out.append(ordered)
    return out, candidates, fallbacks, grouped


def load_source_rows(path: Path) -> list[SourceRow]:
    data = json.loads(path.read_text(encoding='utf-8'))
    if not isinstance(data, list):
        raise TypeError('wordlist.json must contain a JSON array')
    for index, row in enumerate(data):
        if not isinstance(row, dict):
            raise TypeError(f'wordlist.json item {index} must be a JSON object')
    return cast(list[SourceRow], data)


def main() -> None:
    data = load_source_rows(IN)
    out, candidates, fallbacks, grouped = transform(data)
    _ = OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    report: dict[str, object] = {
        'input_entries': len(data),
        'output_entries': len(out),
        'removed_keys': sorted(REMOVE_KEYS),
        'alignment_fallbacks': len(fallbacks),
        'grouped_non_identity_segments': len(grouped),
        'fallback_examples': fallbacks[:50],
        'grouped_examples': grouped[:100],
        'learned_single_unit_readings': sum(len(value) for value in candidates.values()),
    }
    _ = REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    for source, destination in zip(data, out, strict=True):
        word = str(source.get('word', ''))
        reading = str(source.get('reading', ''))
        chars = cast(list[ArrayReadingEntry], destination['chars'])
        assert entry_word(chars) == word, (word, chars, entry_word(chars))
        assert entry_reading(chars) == reading, (reading, chars, entry_reading(chars))
        for key in REMOVE_KEYS:
            assert key not in destination
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
