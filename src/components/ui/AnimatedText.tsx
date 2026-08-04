import { Fragment, useRef } from 'react';
import type { CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

type CharProps = {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
};

function Char({ char, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {/* invisible placeholder holds the layout, the animated copy sits on top */}
      <span style={{ opacity: 0 }}>{char}</span>
      <motion.span style={{ opacity, position: 'absolute', left: 0, top: 0 }}>
        {char}
      </motion.span>
    </span>
  );
}

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
};

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const total = text.length;
  let cursor = 0;

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wordIndex) => {
        const start = cursor;
        cursor += word.length + 1; // + the space that follows

        return (
          <Fragment key={`${word}-${wordIndex}`}>
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {word.split('').map((char, charIndex) => {
                const index = start + charIndex;
                return (
                  <Char
                    key={`${char}-${charIndex}`}
                    char={char}
                    progress={scrollYProgress}
                    range={[index / total, (index + 1) / total]}
                  />
                );
              })}
            </span>
            {/* the line-break opportunity lives between words, never inside one */}
            {wordIndex < words.length - 1 ? ' ' : null}
          </Fragment>
        );
      })}
    </p>
  );
}
