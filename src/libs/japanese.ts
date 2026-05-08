// DISCLAIMER:
// This file has been generated with AI.
// There's no way I'm mapping everything by hand.
// I did my best to format it to be legible, though (manually, because AI is stupid and can't see).

/* @formatter:off */

// prettier-ignore
/**
 * Grouped Hiragana
 */
export const hiragana = {
  //      'a'   'i'     'u'  'e'   　'o'
  a:   [  'あ', 'い',   'う', 'え', 　'お'],
  ka:  [  'か', 'き',   'く', 'け', 　'こ'],
  sa:  [  'さ', 'し',   'す', 'せ', 　'そ'],
  ta:  [  'た', 'ち',   'つ', 'て', 　'と'],
  na:  [  'な', 'に',   'ぬ', 'ね', 　'の'],
  ha:  [  'は', 'ひ',   'ふ', 'へ', 　'ほ'],
  ma:  [  'ま', 'み',   'む', 'め', 　'も'],
  ya:  [  'や', null,   'ゆ', null,  'よ'],
  ra:  [  'ら', 'り',   'る', 'れ', 　'ろ'],
  wa:  [  'わ', null,   null, null,  'を'],
  n:   [  'ん', null,   null, null,  null],
  ga:  [  'が', 'ぎ',   'ぐ', 'げ',   'ご'],
  za:  [  'ざ', 'じ',   'ず', 'ぜ',   'ぞ'],
  da:  [  'だ', null,　 null, 'で',   'ど'],
  ba:  [  'ば', 'び',   'ぶ', 'べ',   'ぼ'],
  pa:  [  'ぱ', 'ぴ',   'ぷ', 'ぺ',   'ぽ'],
  kya: ['きゃ', null, 'きゅ', null, 'きょ'],
  sha: ['しゃ', null, 'しゅ', null, 'しょ'],
  cha: ['ちゃ', null, 'ちゅ', null, 'ちょ'],
  nya: ['にゃ', null, 'にゅ', null, 'にょ'],
  hya: ['ひゃ', null, 'ひゅ', null, 'ひょ'],
  mya: ['みゃ', null, 'みゅ', null, 'みょ'],
  rya: ['りゃ', null, 'りゅ', null, 'りょ'],
  gya: ['ぎゃ', null, 'ぎゅ', null, 'ぎょ'],
  ja:  ['じゃ', null, 'じゅ', null, 'じょ'],
  bya: ['びゃ', null, 'びゅ', null, 'びょ'],
  pya: ['ぴゃ', null, 'ぴゅ', null, 'ぴょ']
} as const;

// prettier-ignore
/**
 * Grouped Katakana
 */
export const katakana = {
//      'a'     'i'     'u'  'e'   　'o'
   a:  [ 'ア',  'イ', 　'ウ', 'エ', 　 'オ'],
  ka:  [ 'カ',  'キ', 　'ク', 'ケ', 　 'コ'],
  sa:  [ 'サ',  'シ', 　'ス', 'セ', 　 'ソ'],
  ta:  [ 'タ',  'チ', 　'ツ', 'テ', 　 'ト'],
  na:  [ 'ナ',  'ニ', 　'ヌ', 'ネ', 　 'ノ'],
  ha:  [ 'ハ',  'ヒ', 　'フ', 'ヘ', 　 'ホ'],
  ma:  [ 'マ',  'ミ', 　'ム', 'メ', 　 'モ'],
  ya:  [ 'ヤ',  null,　 'ユ', null,　 'ヨ'],
  ra:  [ 'ラ',   'リ', 'ル', 'レ', 　  'ロ'],
  wa:  [ 'ワ',  null,　null,　null,　 'ヲ'],
   n:  [ 'ン',  null,  null, null,   null],
  ga:  [ 'ガ',  'ギ',  'グ', 'ゲ',    'ゴ'],
  za:  [ 'ザ',  'ジ',  'ズ', 'ゼ',    'ゾ'],
  da:  [ 'ダ',  null,  null, 'デ',    'ド'],
  ba:  [ 'バ',  'ビ',  'ブ', 'ベ',     'ボ'],
  pa:  [ 'パ',  'ピ',  'プ', 'ペ',     'ポ'],
  kya: ['キャ', null, 'キュ', null,　'キョ'],
  sha: ['シャ', null, 'シュ', null,　'ショ'],
  cha: ['チャ', null, 'チュ', null,　'チョ'],
  nya: ['ニャ', null, 'ニュ', null,　'ニョ'],
  hya: ['ヒャ', null, 'ヒュ', null,　'ヒョ'],
  mya: ['ミャ', null, 'ミュ', null,　'ミョ'],
  rya: ['リャ', null, 'リュ', null,　'リョ'],
  gya: ['ギャ', null, 'ギュ', null,　'ギョ'],
   ja: ['ジャ', null, 'ジュ', null,　'ジョ'],
  bya: ['ビャ', null, 'ビュ', null,　'ビョ'],
  pya: ['ピャ', null, 'ピュ', null,　'ピョ']
} as const;

// prettier-ignore
export const toHiragana = {
    a: hiragana.a  [0],   i: hiragana.a [1],   u: hiragana.a  [2],  e: hiragana.a [3],   o: hiragana.a  [4],
   ka: hiragana.ka [0],  ki: hiragana.ka[1],  ku: hiragana.ka [2], ke: hiragana.ka[3],  ko: hiragana.ka [4],
   sa: hiragana.sa [0], shi: hiragana.sa[1],  su: hiragana.sa [2], se: hiragana.sa[3],  so: hiragana.sa [4],
   ta: hiragana.ta [0], chi: hiragana.ta[1], tsu: hiragana.ta [2], te: hiragana.ta[3],  to: hiragana.ta [4],
   na: hiragana.na [0],  ni: hiragana.na[1],  nu: hiragana.na [2], ne: hiragana.na[3],  no: hiragana.na [4],
   ha: hiragana.ha [0],  hi: hiragana.ha[1],  fu: hiragana.ha [2], he: hiragana.ha[3],  ho: hiragana.ha [4],
   ma: hiragana.ma [0],  mi: hiragana.ma[1],  mu: hiragana.ma [2], me: hiragana.ma[3],  mo: hiragana.ma [4],
   ya: hiragana.ya [0],                       yu: hiragana.ya [2],                      yo: hiragana.ya [4],
   ra: hiragana.ra [0],  ri: hiragana.ra[1],  ru: hiragana.ra [2], re: hiragana.ra[3],  ro: hiragana.ra [4],
   wa: hiragana.wa [0],                                                                 wo: hiragana.wa [4],
    n: hiragana.n  [0],
   ga: hiragana.ga [0],  gi: hiragana.ga[1],  gu: hiragana.ga [2], ge: hiragana.ga[3],  go: hiragana.ga [4],
   za: hiragana.za [0],  ji: hiragana.za[1],  zu: hiragana.za [2], ze: hiragana.za[3],  zo: hiragana.za [4],
   da: hiragana.da [0],                                            de: hiragana.da[3],  do: hiragana.da [4],
   ba: hiragana.ba [0],  bi: hiragana.ba[1],  bu: hiragana.ba [2], be: hiragana.ba[3],  bo: hiragana.ba [4],
   pa: hiragana.pa [0],  pi: hiragana.pa[1],  pu: hiragana.pa [2], pe: hiragana.pa[3],  po: hiragana.pa [4],
  kya: hiragana.kya[0],                      kyu: hiragana.kya[2],                     kyo: hiragana.kya[4],
  sha: hiragana.sha[0],                      shu: hiragana.sha[2],                     sho: hiragana.sha[4],
  cha: hiragana.cha[0],                      chu: hiragana.cha[2],                     cho: hiragana.cha[4],
  nya: hiragana.nya[0],                      nyu: hiragana.nya[2],                     nyo: hiragana.nya[4],
  hya: hiragana.hya[0],                      hyu: hiragana.hya[2],                     hyo: hiragana.hya[4],
  mya: hiragana.mya[0],                      myu: hiragana.mya[2],                     myo: hiragana.mya[4],
  rya: hiragana.rya[0],                      ryu: hiragana.rya[2],                     ryo: hiragana.rya[4],
  gya: hiragana.gya[0],                      gyu: hiragana.gya[2],                     gyo: hiragana.gya[4],
   ja: hiragana.ja [0],                       ju: hiragana.ja [2],                      jo: hiragana.ja [4],
  bya: hiragana.bya[0],                      byu: hiragana.bya[2],                     byo: hiragana.bya[4],
  pya: hiragana.pya[0],                      pyu: hiragana.pya[2],                     pyo: hiragana.pya[4]
} as const;

// prettier-ignore
export const fromHiragana = {
  [hiragana.a  [0]]:   'a', [hiragana.a [1]]:   'i', [hiragana.a  [2]]:   'u', [hiragana.a [3]]:  'e', [hiragana.a  [4]]:   'o',
  [hiragana.ka [0]]:  'ka', [hiragana.ka[1]]:  'ki', [hiragana.ka [2]]:  'ku', [hiragana.ka[3]]: 'ke', [hiragana.ka [4]]:  'ko',
  [hiragana.sa [0]]:  'sa', [hiragana.sa[1]]: 'shi', [hiragana.sa [2]]:  'su', [hiragana.sa[3]]: 'se', [hiragana.sa [4]]:  'so',
  [hiragana.ta [0]]:  'ta', [hiragana.ta[1]]: 'chi', [hiragana.ta [2]]: 'tsu', [hiragana.ta[3]]: 'te', [hiragana.ta [4]]:  'to',
  [hiragana.na [0]]:  'na', [hiragana.na[1]]:  'ni', [hiragana.na [2]]:  'nu', [hiragana.na[3]]: 'ne', [hiragana.na [4]]:  'no',
  [hiragana.ha [0]]:  'ha', [hiragana.ha[1]]:  'hi', [hiragana.ha [2]]:  'fu', [hiragana.ha[3]]: 'he', [hiragana.ha [4]]:  'ho',
  [hiragana.ma [0]]:  'ma', [hiragana.ma[1]]:  'mi', [hiragana.ma [2]]:  'mu', [hiragana.ma[3]]: 'me', [hiragana.ma [4]]:  'mo',
  [hiragana.ya [0]]:  'ya',                          [hiragana.ya [2]]:  'yu',                         [hiragana.ya [4]]:  'yo',
  [hiragana.ra [0]]:  'ra', [hiragana.ra[1]]:  'ri', [hiragana.ra [2]]:  'ru', [hiragana.ra[3]]: 're', [hiragana.ra [4]]:  'ro',
  [hiragana.wa [0]]:  'wa',                                                                            [hiragana.wa [4]]:  'wo',
  [hiragana.n  [0]]:   'n',
  [hiragana.ga [0]]:  'ga', [hiragana.ga[1]]:  'gi', [hiragana.ga [2]]:  'gu', [hiragana.ga[3]]: 'ge', [hiragana.ga [4]]:  'go',
  [hiragana.za [0]]:  'za', [hiragana.za[1]]:  'ji', [hiragana.za [2]]:  'zu', [hiragana.za[3]]: 'ze', [hiragana.za [4]]:  'zo',
  [hiragana.da [0]]:  'da',                                                    [hiragana.da[3]]: 'de', [hiragana.da [4]]:  'do',
  [hiragana.ba [0]]:  'ba', [hiragana.ba[1]]:  'bi', [hiragana.ba [2]]:  'bu', [hiragana.ba[3]]: 'be', [hiragana.ba [4]]:  'bo',
  [hiragana.pa [0]]:  'pa', [hiragana.pa[1]]:  'pi', [hiragana.pa [2]]:  'pu', [hiragana.pa[3]]: 'pe', [hiragana.pa [4]]:  'po',
  [hiragana.kya[0]]: 'kya',                          [hiragana.kya[2]]: 'kyu',                         [hiragana.kya[4]]: 'kyo',
  [hiragana.sha[0]]: 'sha',                          [hiragana.sha[2]]: 'shu',                         [hiragana.sha[4]]: 'sho',
  [hiragana.cha[0]]: 'cha',                          [hiragana.cha[2]]: 'chu',                         [hiragana.cha[4]]: 'cho',
  [hiragana.nya[0]]: 'nya',                          [hiragana.nya[2]]: 'nyu',                         [hiragana.nya[4]]: 'nyo',
  [hiragana.hya[0]]: 'hya',                          [hiragana.hya[2]]: 'hyu',                         [hiragana.hya[4]]: 'hyo',
  [hiragana.mya[0]]: 'mya',                          [hiragana.mya[2]]: 'myu',                         [hiragana.mya[4]]: 'myo',
  [hiragana.rya[0]]: 'rya',                          [hiragana.rya[2]]: 'ryu',                         [hiragana.rya[4]]: 'ryo',
  [hiragana.gya[0]]: 'gya',                          [hiragana.gya[2]]: 'gyu',                         [hiragana.gya[4]]: 'gyo',
  [hiragana.ja [0]]:  'ja',                          [hiragana.ja [2]]:  'ju',                         [hiragana.ja [4]]:  'jo',
  [hiragana.bya[0]]: 'bya',                          [hiragana.bya[2]]: 'byu',                         [hiragana.bya[4]]: 'byo',
  [hiragana.pya[0]]: 'pya',                          [hiragana.pya[2]]: 'pyu',                         [hiragana.pya[4]]: 'pyo'
} as const;

// prettier-ignore
export const toKatakana = {
    a: katakana.a  [0],   i: katakana.a [1],   u: katakana.a  [2],  e: katakana.a [3],   o: katakana.a  [4],
   ka: katakana.ka [0],  ki: katakana.ka[1],  ku: katakana.ka [2], ke: katakana.ka[3],  ko: katakana.ka [4],
   sa: katakana.sa [0], shi: katakana.sa[1],  su: katakana.sa [2], se: katakana.sa[3],  so: katakana.sa [4],
   ta: katakana.ta [0], chi: katakana.ta[1], tsu: katakana.ta [2], te: katakana.ta[3],  to: katakana.ta [4],
   na: katakana.na [0],  ni: katakana.na[1],  nu: katakana.na [2], ne: katakana.na[3],  no: katakana.na [4],
   ha: katakana.ha [0],  hi: katakana.ha[1],  fu: katakana.ha [2], he: katakana.ha[3],  ho: katakana.ha [4],
   ma: katakana.ma [0],  mi: katakana.ma[1],  mu: katakana.ma [2], me: katakana.ma[3],  mo: katakana.ma [4],
   ya: katakana.ya [0],                       yu: katakana.ya [2],                      yo: katakana.ya [4],
   ra: katakana.ra [0],  ri: katakana.ra[1],  ru: katakana.ra [2], re: katakana.ra[3],  ro: katakana.ra [4],
   wa: katakana.wa [0],                                                                 wo: katakana.wa [4],
    n: katakana.n  [0],
   ga: katakana.ga [0],  gi: katakana.ga[1],  gu: katakana.ga [2], ge: katakana.ga[3],  go: katakana.ga [4],
   za: katakana.za [0],  ji: katakana.za[1],  zu: katakana.za [2], ze: katakana.za[3],  zo: katakana.za [4],
   da: katakana.da [0],                                            de: katakana.da[3],  do: katakana.da [4],
   ba: katakana.ba [0],  bi: katakana.ba[1],  bu: katakana.ba [2], be: katakana.ba[3],  bo: katakana.ba [4],
   pa: katakana.pa [0],  pi: katakana.pa[1],  pu: katakana.pa [2], pe: katakana.pa[3],  po: katakana.pa [4],
  kya: katakana.kya[0],                      kyu: katakana.kya[2],                     kyo: katakana.kya[4],
  sha: katakana.sha[0],                      shu: katakana.sha[2],                     sho: katakana.sha[4],
  cha: katakana.cha[0],                      chu: katakana.cha[2],                     cho: katakana.cha[4],
  nya: katakana.nya[0],                      nyu: katakana.nya[2],                     nyo: katakana.nya[4],
  hya: katakana.hya[0],                      hyu: katakana.hya[2],                     hyo: katakana.hya[4],
  mya: katakana.mya[0],                      myu: katakana.mya[2],                     myo: katakana.mya[4],
  rya: katakana.rya[0],                      ryu: katakana.rya[2],                     ryo: katakana.rya[4],
  gya: katakana.gya[0],                      gyu: katakana.gya[2],                     gyo: katakana.gya[4],
   ja: katakana.ja [0],                       ju: katakana.ja [2],                      jo: katakana.ja [4],
  bya: katakana.bya[0],                      byu: katakana.bya[2],                     byo: katakana.bya[4],
  pya: katakana.pya[0],                      pyu: katakana.pya[2],                     pyo: katakana.pya[4]
} as const;

// prettier-ignore
export const fromKatakana = {
  [katakana.a  [0]]:   'a', [katakana.a [1]]:   'i', [katakana.a  [2]]:   'u', [katakana.a [3]]: 'e',  [katakana.a  [4]]:   'o',
  [katakana.ka [0]]:  'ka', [katakana.ka[1]]:  'ki', [katakana.ka [2]]:  'ku', [katakana.ka[3]]: 'ke', [katakana.ka [4]]:  'ko',
  [katakana.sa [0]]:  'sa', [katakana.sa[1]]: 'shi', [katakana.sa [2]]:  'su', [katakana.sa[3]]: 'se', [katakana.sa [4]]:  'so',
  [katakana.ta [0]]:  'ta', [katakana.ta[1]]: 'chi', [katakana.ta [2]]: 'tsu', [katakana.ta[3]]: 'te', [katakana.ta [4]]:  'to',
  [katakana.na [0]]:  'na', [katakana.na[1]]:  'ni', [katakana.na [2]]:  'nu', [katakana.na[3]]: 'ne', [katakana.na [4]]:  'no',
  [katakana.ha [0]]:  'ha', [katakana.ha[1]]:  'hi', [katakana.ha [2]]:  'fu', [katakana.ha[3]]: 'he', [katakana.ha [4]]:  'ho',
  [katakana.ma [0]]:  'ma', [katakana.ma[1]]:  'mi', [katakana.ma [2]]:  'mu', [katakana.ma[3]]: 'me', [katakana.ma [4]]:  'mo',
  [katakana.ya [0]]:  'ya',                          [katakana.ya [2]]:  'yu',                         [katakana.ya [4]]:  'yo',
  [katakana.ra [0]]:  'ra', [katakana.ra[1]]:  'ri', [katakana.ra [2]]:  'ru', [katakana.ra[3]]: 're', [katakana.ra [4]]:  'ro',
  [katakana.wa [0]]:  'wa',                                                                            [katakana.wa [4]]:  'wo',
  [katakana.n  [0]]:   'n',
  [katakana.ga [0]]:  'ga', [katakana.ga[1]]:  'gi', [katakana.ga [2]]:  'gu', [katakana.ga[3]]: 'ge', [katakana.ga [4]]:  'go',
  [katakana.za [0]]:  'za', [katakana.za[1]]:  'ji', [katakana.za [2]]:  'zu', [katakana.za[3]]: 'ze', [katakana.za [4]]:  'zo',
  [katakana.da [0]]:  'da',                                                    [katakana.da[3]]: 'de', [katakana.da [4]]:  'do',
  [katakana.ba [0]]:  'ba', [katakana.ba[1]]:  'bi', [katakana.ba [2]]:  'bu', [katakana.ba[3]]: 'be', [katakana.ba [4]]:  'bo',
  [katakana.pa [0]]:  'pa', [katakana.pa[1]]:  'pi', [katakana.pa [2]]:  'pu', [katakana.pa[3]]: 'pe', [katakana.pa [4]]:  'po',
  [katakana.kya[0]]: 'kya',                          [katakana.kya[2]]: 'kyu',                         [katakana.kya[4]]: 'kyo',
  [katakana.sha[0]]: 'sha',                          [katakana.sha[2]]: 'shu',                         [katakana.sha[4]]: 'sho',
  [katakana.cha[0]]: 'cha',                          [katakana.cha[2]]: 'chu',                         [katakana.cha[4]]: 'cho',
  [katakana.nya[0]]: 'nya',                          [katakana.nya[2]]: 'nyu',                         [katakana.nya[4]]: 'nyo',
  [katakana.hya[0]]: 'hya',                          [katakana.hya[2]]: 'hyu',                         [katakana.hya[4]]: 'hyo',
  [katakana.mya[0]]: 'mya',                          [katakana.mya[2]]: 'myu',                         [katakana.mya[4]]: 'myo',
  [katakana.rya[0]]: 'rya',                          [katakana.rya[2]]: 'ryu',                         [katakana.rya[4]]: 'ryo',
  [katakana.gya[0]]: 'gya',                          [katakana.gya[2]]: 'gyu',                         [katakana.gya[4]]: 'gyo',
  [katakana.ja [0]]:  'ja',                          [katakana.ja [2]]:  'ju',                         [katakana.ja [4]]:  'jo',
  [katakana.bya[0]]: 'bya',                          [katakana.bya[2]]: 'byu',                         [katakana.bya[4]]: 'byo',
  [katakana.pya[0]]: 'pya',                          [katakana.pya[2]]: 'pyu',                         [katakana.pya[4]]: 'pyo'
} as const;
