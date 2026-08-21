const SIZE_MIN = 1.75
const SIZE_MAX = 3.75

const DEFAULT_QUOTE = "What stands in the way becomes the way."
const DEFAULT_AUTHOR = "Marcus Aurelius"

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
  author = DEFAULT_AUTHOR,
}: {
  text?: string
  author?: string
}) {
  const words = text.trim().split(/\s+/).filter(Boolean)

  return (
    <figure className="m-0 flex max-w-full flex-col gap-4">
      <blockquote className="m-0 font-light leading-[0.9] tracking-wide text-muted-foreground">
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
      {author ? (
        <figcaption className="text-sm text-muted-foreground/80">
          — {author}
        </figcaption>
      ) : null}
    </figure>
  )
}
