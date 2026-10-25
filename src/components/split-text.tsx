export function SplitText({
  text,
  className,
  play,
  delay = 0,
}: {
  text: string;
  className?: string;
  play: boolean;
  delay?: number;
}) {
  const words = text.split(" ");
  let index = 0;
  return (
    <span className={className}>
      {words.map((word, wordIndex) => {
        const letters = word.split("").map((char) => {
          const at = index;
          index += 1;
          return (
            <span
              key={`${word}-${at}`}
              className={play ? "split-char play" : "split-char"}
              style={play ? { animationDelay: `${delay + at * 0.028}s` } : undefined}
              aria-hidden
            >
              {char}
            </span>
          );
        });
        index += 1;
        return (
          <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
            {letters}
            {wordIndex < words.length - 1 ? "\u00A0" : null}
          </span>
        );
      })}
    </span>
  );
}
