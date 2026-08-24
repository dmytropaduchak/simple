const SCRIPT_TESTS: { name: string; pattern: RegExp }[] = [
  { name: "Latin", pattern: /\p{Script=Latin}/u },
  { name: "Cyrillic", pattern: /\p{Script=Cyrillic}/u },
  { name: "Greek", pattern: /\p{Script=Greek}/u },
  { name: "Arabic", pattern: /\p{Script=Arabic}/u },
  { name: "Hebrew", pattern: /\p{Script=Hebrew}/u },
  { name: "Han", pattern: /\p{Script=Han}/u },
  { name: "Hiragana", pattern: /\p{Script=Hiragana}/u },
  { name: "Katakana", pattern: /\p{Script=Katakana}/u },
  { name: "Hangul", pattern: /\p{Script=Hangul}/u },
  { name: "Devanagari", pattern: /\p{Script=Devanagari}/u },
]

export function scriptsIn(text: string) {
  return SCRIPT_TESTS.filter((test) => test.pattern.test(text)).map(
    (test) => test.name,
  )
}
