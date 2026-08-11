import { useEffect, useRef, useState } from 'react';
import { Check, Code2, Link2, Share2 } from 'lucide-react';
import { Facebook, Linkedin } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

/** lucide has no WhatsApp or X glyph, so both are drawn here. */
function WhatsApp(props: LucideProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12.04 2A9.93 9.93 0 0 0 2.1 11.95a9.87 9.87 0 0 0 1.33 4.96L2 22l5.23-1.37a9.93 9.93 0 0 0 4.81 1.23h.01A9.93 9.93 0 0 0 22 11.95 9.93 9.93 0 0 0 12.04 2Zm0 18.13h-.01a8.25 8.25 0 0 1-4.2-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.22 8.22 0 0 1-1.26-4.38 8.25 8.25 0 1 1 8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06a6.72 6.72 0 0 1-3.36-2.94c-.25-.44.25-.4.72-1.35.08-.16.04-.3-.02-.42-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42l-.47-.01c-.16 0-.42.06-.65.3-.22.25-.85.84-.85 2.03 0 1.2.87 2.36.99 2.52.12.16 1.71 2.61 4.15 3.66 1.54.67 2.15.72 2.92.61.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

function XLogo(props: LucideProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.11l11.97 15.64Z" />
    </svg>
  );
}

type ShareBarProps = {
  url: string;
  title: string;
  excerpt?: string;
};

export default function ShareBar({ url, title, excerpt = '' }: ShareBarProps) {
  const [copied, setCopied] = useState<'link' | 'embed' | null>(null);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const timer = useRef<number>();

  useEffect(() => {
    // navigator.share only exists in the browser, and mostly on mobile
    setCanNativeShare(typeof navigator !== 'undefined' && !!navigator.share);
    return () => window.clearTimeout(timer.current);
  }, []);

  const flash = (what: 'link' | 'embed') => {
    setCopied(what);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(null), 2000);
  };

  const copy = async (text: string, what: 'link' | 'embed') => {
    try {
      await navigator.clipboard.writeText(text);
      flash(what);
    } catch {
      // clipboard is blocked on insecure origins and in some browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      flash(what);
    }
  };

  const embed = `<a href="${url}">${title}</a> — Gianluca Scattarella`;
  const enc = encodeURIComponent;

  const targets = [
    {
      label: 'WhatsApp',
      Icon: WhatsApp,
      href: `https://wa.me/?text=${enc(`${title} ${url}`)}`,
    },
    {
      label: 'X',
      Icon: XLogo,
      href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`,
    },
    {
      label: 'Facebook',
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    },
    {
      label: 'LinkedIn',
      Icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    },
  ];

  const pill =
    'group relative flex items-center justify-center w-11 h-11 rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA]/70 transition-all duration-300 hover:text-white hover:border-transparent';

  const glow = (
    <span
      aria-hidden="true"
      className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      }}
    />
  );

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-[#D7E2EA]/15 pt-8">
      <span className="text-[#D7E2EA]/40 font-light uppercase tracking-widest text-[0.65rem]">
        Share this
      </span>

      <div className="flex flex-wrap items-center gap-2.5">
        {targets.map(({ label, Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Share on ${label}`}
            title={`Share on ${label}`}
            className={pill}
          >
            {glow}
            <Icon className="relative w-[1.05rem] h-[1.05rem]" strokeWidth={1.6} />
          </a>
        ))}

        <button
          type="button"
          onClick={() => copy(url, 'link')}
          aria-label="Copy link"
          title={copied === 'link' ? 'Copied' : 'Copy link'}
          className={pill}
        >
          {glow}
          {copied === 'link' ? (
            <Check className="relative w-[1.05rem] h-[1.05rem]" strokeWidth={2} />
          ) : (
            <Link2 className="relative w-[1.05rem] h-[1.05rem]" strokeWidth={1.6} />
          )}
        </button>

        <button
          type="button"
          onClick={() => copy(embed, 'embed')}
          aria-label="Copy embed code"
          title={copied === 'embed' ? 'Copied' : 'Copy embed code'}
          className={pill}
        >
          {glow}
          {copied === 'embed' ? (
            <Check className="relative w-[1.05rem] h-[1.05rem]" strokeWidth={2} />
          ) : (
            <Code2 className="relative w-[1.05rem] h-[1.05rem]" strokeWidth={1.6} />
          )}
        </button>

        {canNativeShare ? (
          <button
            type="button"
            onClick={() => navigator.share({ title, text: excerpt, url }).catch(() => {})}
            aria-label="Share"
            title="Share"
            className={pill}
          >
            {glow}
            <Share2 className="relative w-[1.05rem] h-[1.05rem]" strokeWidth={1.6} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
