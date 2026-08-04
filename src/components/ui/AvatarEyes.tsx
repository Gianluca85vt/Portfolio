import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

/**
 * The avatar with eyes that track the cursor.
 *
 * The render itself is used untouched. For each eye a copy of the whole eyeball
 * — sclera, iris, the render's own shading — is cut out as `eye-layer-*.png` and
 * slides on top of it, clipped by `eye-mask-*.png` so it can never reach the
 * lashes. At rest the layer lands exactly on itself, so the avatar is identical
 * to the original; as it slides, whatever it stops covering falls back to the
 * render's real sclera underneath.
 *
 * Earlier versions repainted the sockets with a synthetic sclera and moved only
 * the iris. Every artefact came from that: seams where the repaint met the
 * render, a ghost of the lid shadow, and a mask that domed up over the lashes.
 *
 * The mask is the sclera and nothing more: detected sclera plus the iris disc
 * clipped at the lash line. Numbers are pixels of the 656x913 source render, so
 * the rig scales with the displayed size. Re-measure if the portrait changes.
 */
const SRC_W = 656;
const SRC_H = 913;

type Eye = {
  layer: string;
  mask: string;
  /** socket box in source px */
  box: { x: number; y: number; w: number; h: number };
};

const EYES: Eye[] = [
  {
    layer: '/img/me/eye-layer-left.png',
    mask: '/img/me/eye-mask-left.png',
    box: { x: 146, y: 330, w: 117, h: 69 },
  },
  {
    layer: '/img/me/eye-layer-right.png',
    mask: '/img/me/eye-mask-right.png',
    box: { x: 392, y: 328, w: 137, h: 71 },
  },
];

/**
 * Travel in source px. The socket is only ~30px wider than the iris and barely
 * taller, so past this the iris runs out of sclera and reads as googly.
 */
const TRAVEL_X = 10;
const TRAVEL_Y = 3;

/** the eye line, as a fraction of image height */
const EYE_LINE = 358 / SRC_H;

type AvatarEyesProps = {
  className?: string;
  alt: string;
};

export default function AvatarEyes({ className = '', alt }: AvatarEyesProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  // -1..1 on each axis, smoothed
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 150, damping: 17, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 150, damping: 17, mass: 0.35 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const clamp = (v: number) => Math.max(-1, Math.min(1, v));

    const onMove = (event: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0) return;

      const faceX = rect.left + rect.width * 0.5;
      const faceY = rect.top + rect.height * EYE_LINE;

      // full deflection well before the screen edge, so the eyes actually
      // travel during ordinary cursor movement
      rawX.set(clamp((event.clientX - faceX) / (window.innerWidth * 0.22)));
      rawY.set(clamp((event.clientY - faceY) / (window.innerHeight * 0.24)));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [rawX, rawY]);

  return (
    <div ref={wrapRef} className="relative inline-block">
      <img
        src="/img/me/avatar-base.png"
        alt={alt}
        className={className}
        draggable={false}
      />

      {EYES.map((eye) => (
        <EyeSocket key={eye.layer} eye={eye} x={x} y={y} />
      ))}
    </div>
  );
}

function EyeSocket({
  eye,
  x,
  y,
}: {
  eye: Eye;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  // translate in % of the layer's own box, so it scales with the image
  const tx = useTransform(x, (v) => `${(v * TRAVEL_X * 100) / eye.box.w}%`);
  const ty = useTransform(y, (v) => `${(v * TRAVEL_Y * 100) / eye.box.h}%`);

  return (
    <div
      aria-hidden="true"
      className="absolute"
      style={{
        left: `${(eye.box.x / SRC_W) * 100}%`,
        top: `${(eye.box.y / SRC_H) * 100}%`,
        width: `${(eye.box.w / SRC_W) * 100}%`,
        height: `${(eye.box.h / SRC_H) * 100}%`,
        maskImage: `url(${eye.mask})`,
        WebkitMaskImage: `url(${eye.mask})`,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
      }}
    >
      <motion.img
        src={eye.layer}
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full max-w-none"
        style={{ x: tx, y: ty }}
      />
    </div>
  );
}
