import { useEffect, useRef } from 'react';

/**
 * The portrait as a head-turn video scrubbed by the pointer.
 *
 * The source is all-intra — 373 frames, every one a keyframe — which is the
 * only reason this reads as motion rather than as a slideshow. Seeking a normal
 * encode lands on the nearest keyframe and decodes forward, and with keyframes
 * seconds apart the head jumps. Re-encode with `-g 1` if the clip is ever
 * replaced, or the effect falls apart quietly.
 *
 * Nothing autoplays. The video is a frame store the pointer indexes into, by
 * hover on a desktop and by tap on a phone.
 */

const SRC = '/img/video/rotazione%20faccia.mp4';

/**
 * How the cursor maps onto the timeline.
 *
 * `absolute` ties the frame to where the pointer is: left edge is one end of
 * the turn, right edge the other, so the head holds a position and genuinely
 * follows. `relative` accumulates movement instead — the reference behaviour
 * from the pattern this came from, where speed and direction push the timeline
 * along. On a head turn that one has no home: the face ends up parked at
 * whichever extreme the last gesture left it.
 */
const MODE: 'absolute' | 'relative' = 'absolute';

/** relative mode only: how much of the clip a full-width sweep travels */
const SENSITIVITY = 0.8;

/**
 * How quickly the head catches up, per frame. Seeking straight to the pointer
 * is accurate and looks mechanical; easing gives it the weight of a head
 * turning. Higher is snappier.
 */
const EASE = 0.12;

/** Below a frame's worth of difference there is nothing to seek to. */
const EPSILON = 1 / 60;

/**
 * Where on the timeline a pointer at `x` should put the head.
 *
 * Pulled out of the effect so it can be checked without a browser: inside the
 * component it only runs on animation frames, and a hidden pane freezes those,
 * which makes the behaviour untestable exactly when you want to test it.
 */
export function timeForPointer(
  x: number,
  width: number,
  duration: number,
  previous = 0,
  mode: 'absolute' | 'relative' = MODE,
  prevX: number | null = null
): number {
  if (!Number.isFinite(duration) || duration <= 0 || width <= 0) return previous;

  const next =
    mode === 'absolute'
      ? (x / width) * duration
      : previous + ((prevX === null ? 0 : x - prevX) / width) * SENSITIVITY * duration;

  return Math.max(0, Math.min(duration, next));
}

type Props = {
  className?: string;
  /** Described for anyone who cannot see it; the motion carries no meaning. */
  alt: string;
};

export default function AvatarScrub({ className = '', alt }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let target = 0;
    let current = 0;
    let prevX: number | null = null;
    let seeking = false;
    let frame = 0;
    let ready = false;

    const middle = () => (video.duration || 0) / 2;

    const onMeta = () => {
      ready = true;
      // Open on the middle of the turn — the face level, looking ahead — so the
      // first thing anyone sees is the portrait rather than one profile of it.
      current = middle();
      target = current;
      video.currentTime = current;
    };

    const onSeeked = () => {
      seeking = false;
    };

    // Pointer events rather than mouse events, so one path serves both.
    //
    // This used to bind mousemove behind a `(hover: hover) and (pointer: fine)`
    // check, which meant nothing at all was bound on a phone and the head sat
    // frozen on its middle frame however you tapped. The reasoning written next
    // to it — that a phone should not download a video to show one frame — was
    // wrong twice over: the element carries a src and preload="auto", so the
    // download happens regardless, and the guard only removed the interaction
    // it had already paid for.
    //
    // pointermove covers hover on a desktop; pointerdown covers a tap, which is
    // what makes the head turn toward the side of the screen you touch.
    const onMove = (event: PointerEvent) => {
      if (!ready || !video.duration) return;

      target = timeForPointer(
        event.clientX,
        window.innerWidth,
        video.duration,
        target,
        MODE,
        prevX
      );
      prevX = event.clientX;
    };

    // The easing advances every frame; only the seek itself waits for the last
    // one to land. Gating both together tied the rate of the turn to decoder
    // latency instead of to the clock, and the head crawled — measured at 15ms
    // a seek, that is a quarter of the movement it should make in a frame.
    //
    // Seeking on every mousemove instead would flood the decoder and stall it,
    // hence the in-flight guard.
    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!ready) return;

      current += (target - current) * EASE;

      if (seeking) return;
      if (Math.abs(current - video.currentTime) < EPSILON) return;

      seeking = true;
      video.currentTime = current;
    };

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('seeked', onSeeked);
    if (video.readyState >= 1) onMeta();

    if (!still) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onMove, { passive: true });
      frame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('seeked', onSeeked);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={SRC}
      aria-label={alt}
      className={className}
      /* The clip is a head on a solid black field, and H.264 in an MP4 cannot
         carry an alpha channel to cut it out. `screen` leaves the backdrop
         untouched wherever the source is black, which erases the field exactly.
         The page ground was taken to #000000 to match, which makes this a
         no-op there — screen against black returns the source untouched. It is
         kept because it also erases the field against anything that is not
         quite black, and the ground was #0C0C0C until an hour ago.

         It only works while nothing between here and the page ground makes its
         own stacking context — an ancestor left at opacity below 1, a filter, a
         transform with will-change. If the rectangle ever comes back, that is
         where it went. */
      style={{ mixBlendMode: 'screen' }}
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      draggable={false}
      tabIndex={-1}
    />
  );
}
