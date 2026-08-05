import { Facebook, Instagram, Linkedin } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';
import { socials } from '../../data/portfolio';

/**
 * lucide-react ships Linkedin, Facebook and Instagram but has no TikTok or
 * WhatsApp glyph, so those two are drawn here. Both are sized and stroked to
 * sit next to the lucide icons without looking bolted on.
 */
function TikTok(props: LucideProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .53.04.77.12v-3.2a5.72 5.72 0 0 0-.77-.05 5.79 5.79 0 1 0 5.79 5.79V9.01a7.35 7.35 0 0 0 4.29 1.38V7.3a4.28 4.28 0 0 1-3.34-1.48Z" />
    </svg>
  );
}

function WhatsApp(props: LucideProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12.04 2A9.93 9.93 0 0 0 2.1 11.95a9.87 9.87 0 0 0 1.33 4.96L2 22l5.23-1.37a9.93 9.93 0 0 0 4.81 1.23h.01A9.93 9.93 0 0 0 22 11.95 9.93 9.93 0 0 0 12.04 2Zm0 18.13h-.01a8.25 8.25 0 0 1-4.2-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.22 8.22 0 0 1-1.26-4.38 8.25 8.25 0 1 1 8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06a6.72 6.72 0 0 1-3.36-2.94c-.25-.44.25-.4.72-1.35.08-.16.04-.3-.02-.42-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42l-.47-.01c-.16 0-.42.06-.65.3-.22.25-.85.84-.85 2.03 0 1.2.87 2.36.99 2.52.12.16 1.71 2.61 4.15 3.66 1.54.67 2.15.72 2.92.61.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

const ICONS: Record<string, ComponentType<LucideProps>> = {
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  tiktok: TikTok,
  whatsapp: WhatsApp,
};

export default function SocialLinks() {
  return (
    <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {socials.map((social) => {
        const Icon = ICONS[social.icon];
        return (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              title={social.label}
              className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA]/70 transition-all duration-300 hover:text-white hover:border-transparent"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                }}
              />
              <Icon
                className="relative w-5 h-5 sm:w-[1.35rem] sm:h-[1.35rem]"
                strokeWidth={1.6}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
