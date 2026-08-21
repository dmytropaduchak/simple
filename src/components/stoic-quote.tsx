const SIZE_MIN = 1.75
const SIZE_MAX = 3.75

const DEFAULT_QUOTE = "What stands in the way becomes the way."

function wordSize(index: number, total: number) {
  if (total <= 1) {
    return SIZE_MAX
  }

  const t = index / Math.max(total - 1, 1)
  const wave = 0.5 + 0.5 * Math.sin(t * Math.PI * 2.2)
  return SIZE_MIN + (SIZE_MAX - SIZE_MIN) * wave
}

export function StoicQuote({
  text = DEFAULT_QUOTE,
}: {
  text?: string
}) {
  const words = text.trim().split(/\s+/).filter(Boolean)

  return (
    <blockquote className="m-0 max-w-full font-light leading-[0.9] tracking-wide text-muted-foreground">
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="mr-[0.28em] inline-block whitespace-nowrap last:mr-0"
          style={{ fontSize: `${wordSize(index, words.length)}rem` }}
        >
          {word}
        </span>
      ))}
    </blockquote>
  )
}
