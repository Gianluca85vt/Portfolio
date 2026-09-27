import { useMemo, useRef } from 'react';
import { useLetterGlow } from './useLetterGlow';

/**
 * Per-letter backlight that follows the cursor. The effect itself lives in
 * useLetterGlow, which the home page's headings share; this renders a string
 * as letters it can light.
 */
type GlowTextProps = {
  text: string;
  /** applied to each character — put the gradient class here */
  charClassName?: string;
};

export default function GlowText({ text, charClassName = '' }: GlowTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const words = useMemo(() => text.split(' '), [text]);
  useLetterGlow(rootRef, text);

  return (
    <span ref={rootRef}>
      {words.map((word, wordIndex) => {
        return (
          <span key={`${word}-${wordIndex}`}>
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {word.split('').map((char, charIndex) => {
                return (
                  <span
                    key={`${char}-${charIndex}`}
                    data-glow=""
                    className={charClassName}
                    style={{
                      display: 'inline-block',
                      transformOrigin: 'center bottom',
                      // No permanent will-change here. It promotes every letter
                      // to its own compositing layer, and iOS Safari fails to
                      // paint background-clip:text on a promoted layer — the
                      // heading stays invisible until a rotation forces a
                      // repaint. It is set only while a letter is animating.
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
            {wordIndex < words.length - 1 ? ' ' : null}
          </span>
        );
      })}
    </span>
  );
}
