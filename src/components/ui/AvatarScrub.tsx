import { useEffect, useRef, useState } from 'react';

/**
 * The portrait as a head-turn video scrubbed by the pointer.
 *
 * The source is all-intra — 190 frames, every one a keyframe — which is the
 * only reason this reads as motion rather than as a slideshow. Seeking a normal
 * encode lands on the nearest keyframe and decodes forward, and with keyframes
 * seconds apart the head jumps. Re-encode with `-g 1` if the clip is ever
 * replaced, or the effect falls apart quietly.
 *
 * Nothing autoplays. The video is a frame store the pointer indexes into, by
 * hover on a desktop and by tap on a phone.
 *
 * A second clip holds the same turn as a wireframe (scripts/wire-head.mjs),
 * cropped to the middle half of the frame. It is seeked to the same time and
 * shown instead of the colour one in the wireframe view, and for a quarter of
 * a second now and then as a glitch. It only downloads when it is needed: at
 * once if the wireframe view is asked for, otherwise a few seconds after the
 * portrait has loaded, on a desktop, and never on a connection asking to save
 * data. Until it has loaded there is simply no glitch.
 */

const SRC = '/img/video/rotazione%20faccia.mp4';
const WIRE_SRC = '/img/video/rotazione%20faccia%20wire.mp4';

/** The glitch: how long it lasts, and the quiet between two of them. */
const GLITCH_MS = 250;
const GLITCH_EVERY = [5500, 11000] as const;
/** How long after the portrait loads the wireframe starts downloading on its own. */
const WIRE_PREFETCH_MS = 3500;

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
  /** Called once, when the opening frame is on screen. */
  onReady?: () => void;
  /** Show the wireframe instead of the colour render. */
  wire?: boolean;
  /** Flash the wireframe for a moment every few seconds. */
  glitch?: boolean;
  /** Told whether the wireframe clip can be shown yet. */
  onWireReady?: (ready: boolean) => void;
};

/** Seeks one clip toward a time, never queuing a second seek behind the first. */
class Seeker {
  seeking = false;
  constructor(public video: HTMLVideoElement) {
    video.addEventListener('seeked', () => (this.seeking = false));
  }
  to(time: number) {
    const v = this.video;
    if (this.seeking || v.readyState < 1 || Math.abs(time - v.currentTime) < EPSILON) return;
    this.seeking = true;
    v.currentTime = Math.min(time, v.duration || time);
  }
}

export default function AvatarScrub({ className = '', alt, onReady, wire = false, glitch = false, onWireReady }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wireRef = useRef<HTMLVideoElement>(null);
  // Kept in refs so a new callback or prop on re-render does not restart the
  // effect, which would reset the head to the middle of its turn.
  const readyRef = useRef(onReady);
  readyRef.current = onReady;
  const wireReadyRef = useRef(onWireReady);
  wireReadyRef.current = onWireReady;
  const modeRef = useRef({ wire, glitch });
  modeRef.current = { wire, glitch };
  const [wireSrc, setWireSrc] = useState<string | undefined>(undefined);
  const syncRef = useRef<() => void>(() => {});

  // Asking for the wireframe view downloads the clip straight away.
  useEffect(() => {
    if (wire) setWireSrc(WIRE_SRC);
    syncRef.current();
  }, [wire]);

  useEffect(() => {
    const video = videoRef.current;
    const wireVideo = wireRef.current;
    if (!video || !wireVideo) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const colour = new Seeker(video);
    const wires = new Seeker(wireVideo);

    let target = 0;
    let current = 0;
    let prevX: number | null = null;
    let frame = 0;
    let ready = false;
    let shown = false;
    let wireReady = false;
    let glitchUntil = 0;
    let glitchTimer = 0;
    let prefetchTimer = 0;
    let visible = true;

    const middle = () => (video.duration || 0) / 2;

    const onMeta = () => {
      ready = true;
      // Open on the middle of the turn — the face level, looking ahead — so the
      // first thing anyone sees is the portrait rather than one profile of it.
      current = middle();
      target = current;
      colour.to(current);
    };

    const onSeeked = () => {
      if (!shown) {
        shown = true;
        readyRef.current?.();
        // On a desktop that is not saving data, fetch the wireframe once the
        // portrait is up, so the glitch has something to show.
        const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
        const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (!still && fine && !conn?.saveData) {
          prefetchTimer = window.setTimeout(() => setWireSrc(WIRE_SRC), WIRE_PREFETCH_MS);
        }
      }
    };

    const onWireData = () => {
      if (wireReady) return;
      wireReady = true;
      wires.to(current);
      wireReadyRef.current?.(true);
      if (still) syncRef.current();
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

    // Which clip is on screen. The wireframe covers the colour one entirely in
    // its view; during a glitch both show and the CSS animation slices between
    // them.
    const paint = (now: number) => {
      const glitching = now < glitchUntil;
      const showWire = wireReady && (modeRef.current.wire || glitching);
      video.style.opacity = wireReady && modeRef.current.wire && !glitching ? '0' : '';
      wireVideo.style.opacity = showWire ? '1' : '0';
      video.classList.toggle('vp-glitch-base', glitching);
      wireVideo.classList.toggle('vp-glitch-wire', glitching);
      return showWire;
    };

    // The easing advances every frame; only the seek itself waits for the last
    // one to land. Gating both together tied the rate of the turn to decoder
    // latency instead of to the clock, and the head crawled — measured at 15ms
    // a seek, that is a quarter of the movement it should make in a frame.
    //
    // Seeking on every mousemove instead would flood the decoder and stall it,
    // hence the in-flight guard in Seeker.
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (!ready) return;

      current += (target - current) * EASE;
      const showWire = paint(now);
      // Only the clips on screen are seeked; a hidden one catches up when shown.
      if (!(showWire && modeRef.current.wire && now >= glitchUntil)) colour.to(current);
      if (showWire) wires.to(current);
    };

    const scheduleGlitch = () => {
      const [lo, hi] = GLITCH_EVERY;
      glitchTimer = window.setTimeout(() => {
        const { wire: inWire, glitch: on } = modeRef.current;
        if (on && wireReady && visible && !inWire && !document.hidden) {
          wires.to(current);
          glitchUntil = performance.now() + GLITCH_MS;
        }
        scheduleGlitch();
      }, lo + Math.random() * (hi - lo));
    };

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(video);

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('seeked', onSeeked);
    wireVideo.addEventListener('loadeddata', onWireData);
    if (video.readyState >= 1) onMeta();
    if (wireVideo.readyState >= 2) onWireData();

    if (!still) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onMove, { passive: true });
      frame = requestAnimationFrame(tick);
      scheduleGlitch();
    }

    // With reduced motion nothing turns and nothing glitches, so there is no
    // frame loop; the wireframe view still has to swap clips when asked for.
    syncRef.current = () => {
      if (paint(0)) wires.to(current);
    };

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(glitchTimer);
      window.clearTimeout(prefetchTimer);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('seeked', onSeeked);
      wireVideo.removeEventListener('loadeddata', onWireData);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src={SRC}
        aria-label={alt}
        className={className}
        /* The clip is a head on a solid black field, and H.264 in an MP4 cannot
           carry an alpha channel to cut it out. `screen` leaves the backdrop
           untouched wherever the source is black, which erases the field
           exactly, and lets the floor behind the head show through it.

           It only works while nothing between here and the section makes its
           own stacking context — an ancestor left at opacity below 1, a filter,
           a transform with will-change. If the rectangle ever comes back, that
           is where it went. */
        style={{ mixBlendMode: 'screen' }}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        draggable={false}
        tabIndex={-1}
      />
      {/* The wireframe covers the middle half of the frame, where the head is. */}
      <video
        ref={wireRef}
        src={wireSrc}
        aria-hidden="true"
        className="absolute top-0 left-1/4 w-1/2 h-full pointer-events-none select-none"
        style={{ mixBlendMode: 'screen', opacity: 0 }}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        draggable={false}
        tabIndex={-1}
      />
    </>
  );
}
