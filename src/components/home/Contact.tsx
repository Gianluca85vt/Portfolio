import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, Download, Linkedin, Mail } from 'lucide-react';
import SocialLinks from '../ui/SocialLinks';
import { contact, services, site, socials } from '../../data/portfolio';
import { contactCopy } from '../../data/home';
import { Reveal, SectionTitle, Slate, useMode } from './ui';

type Tab = 'project' | 'hiring';

const NOT_SURE = 'Not sure yet';

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-full border px-3.5 py-2 text-[0.8rem] font-medium tracking-wide transition-colors duration-300 ${
        on ? 'bg-[#D7E2EA] border-[#D7E2EA] text-black' : 'border-[#D7E2EA]/20 text-[#D7E2EA]/75 hover:border-[#D7E2EA]/50 hover:text-[#D7E2EA]'
      }`}
    >
      {children}
    </button>
  );
}

function listJoin(items: string[]) {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

/**
 * A brief in three taps: what, when, and a line of detail, written out as the
 * email it becomes. Nothing is sent from the page — the button hands the
 * message to the visitor's own mail app, where they can change anything.
 */
function Brief() {
  const c = contactCopy.project;
  const [needs, setNeeds] = useState<string[]>([]);
  const [when, setWhen] = useState<string | null>(null);
  const [extra, setExtra] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const toggle = (name: string) =>
    setNeeds((cur) => {
      if (name === NOT_SURE) return cur.includes(NOT_SURE) ? [] : [NOT_SURE];
      const without = cur.filter((n) => n !== NOT_SURE);
      return without.includes(name) ? without.filter((n) => n !== name) : [...without, name];
    });

  const picked = needs.filter((n) => n !== NOT_SURE);
  const subject = picked.length ? `Project enquiry: ${picked.join(', ')}` : 'Project enquiry';
  const lines = [
    'Hi Gianluca,',
    '',
    picked.length
      ? `I'm looking for help with ${listJoin(picked)}.`
      : "I have a project and I'm not sure yet what it needs.",
    when ? `Timing: ${when.toLowerCase()}.` : '',
    extra.trim() ? `\n${extra.trim()}` : '',
  ].filter((l, i) => l !== '' || i === 1);
  const body = lines.join('\n');
  const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
      <div className="lg:col-span-7 flex flex-col gap-8">
        <fieldset>
          <legend className="vp-label text-[#D7E2EA]/55 mb-3">
            <span className="text-[#ff8a3d]">01</span> {c.needs}
          </legend>
          <div className="flex flex-wrap gap-2">
            {[...services.map((s) => s.name), NOT_SURE].map((name) => (
              <Chip key={name} on={needs.includes(name)} onClick={() => toggle(name)}>
                {name}
              </Chip>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="vp-label text-[#D7E2EA]/55 mb-3">
            <span className="text-[#ff8a3d]">02</span> {c.when}
          </legend>
          <div className="flex flex-wrap gap-2">
            {c.whenOptions.map((w) => (
              <Chip key={w} on={when === w} onClick={() => setWhen((cur) => (cur === w ? null : w))}>
                {w}
              </Chip>
            ))}
          </div>
        </fieldset>

        <label className="flex flex-col gap-3">
          <span className="vp-label text-[#D7E2EA]/55">
            <span className="text-[#ff8a3d]">03</span> {c.extra}
          </span>
          <textarea
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
            rows={3}
            maxLength={600}
            placeholder={c.placeholder}
            className="w-full resize-none rounded-[4px] border border-[#D7E2EA]/15 bg-white/[0.02] px-4 py-3 text-[#D7E2EA] font-light text-[0.95rem] placeholder:text-[#D7E2EA]/30 focus:border-[#D7E2EA]/40 outline-none"
          />
        </label>
      </div>

      <div className="lg:col-span-5">
        <div className="relative rounded-[4px] border border-[#D7E2EA]/15 bg-[#070707] p-5 sm:p-6">
          <span className="vp-label text-[#D7E2EA]/45">{c.preview}</span>
          <dl className="vp-mono text-[0.78rem] mt-4 space-y-1.5 text-[#D7E2EA]/60">
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 text-[#D7E2EA]/35">To</dt>
              <dd className="text-[#D7E2EA] break-all">{site.email}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 text-[#D7E2EA]/35">Subject</dt>
              <dd className="text-[#D7E2EA]">{subject}</dd>
            </div>
          </dl>
          <pre className="vp-mono whitespace-pre-wrap text-[0.8rem] leading-relaxed text-[#D7E2EA]/80 mt-4 pt-4 border-t border-[#D7E2EA]/10 min-h-[120px]">
            {body}
          </pre>
          <div className="flex flex-wrap gap-2 mt-5">
            <a
              href={href}
              className="inline-flex items-center gap-2 rounded-full vp-grad-bg text-white font-medium uppercase tracking-widest text-[0.68rem] px-5 py-3 transition-transform duration-300 hover:scale-[1.03]"
            >
              <Mail className="w-4 h-4" strokeWidth={1.8} />
              {c.send}
            </a>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(site.email).then(() => setCopied(true), () => {});
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA] font-medium uppercase tracking-widest text-[0.68rem] px-5 py-3 transition-colors duration-300 hover:bg-white/10"
            >
              {copied ? <Check className="w-4 h-4" strokeWidth={1.8} /> : <Copy className="w-4 h-4" strokeWidth={1.8} />}
              <span aria-live="polite">{copied ? c.copied : c.copy}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hiring() {
  const linkedin = socials.find((s) => s.icon === 'linkedin');
  const btn =
    'inline-flex items-center justify-between gap-3 rounded-[4px] border border-[#D7E2EA]/15 px-5 py-5 text-[#D7E2EA] transition-colors duration-300 hover:bg-[#D7E2EA] hover:text-black group';
  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
      <p className="lg:col-span-6 text-[#D7E2EA]/80 font-light leading-relaxed text-[1.1rem] sm:text-[1.25rem]">
        {contactCopy.hiring.body}
      </p>
      <div className="lg:col-span-6 grid gap-2">
        <a href={site.cv} download={site.cvFileName} className={btn}>
          <span className="flex items-center gap-3 font-medium uppercase tracking-widest text-[0.78rem]">
            <Download className="w-5 h-5" strokeWidth={1.5} /> Download resume
          </span>
          <span className="vp-label !text-[0.58rem] opacity-60">PDF</span>
        </a>
        {linkedin ? (
          <a href={linkedin.href} target="_blank" rel="noreferrer" className={btn}>
            <span className="flex items-center gap-3 font-medium uppercase tracking-widest text-[0.78rem]">
              <Linkedin className="w-5 h-5" strokeWidth={1.5} /> LinkedIn
            </span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
          </a>
        ) : null}
        <a href={`mailto:${site.email}`} className={btn}>
          <span className="flex items-center gap-3 font-medium uppercase tracking-widest text-[0.78rem]">
            <Mail className="w-5 h-5" strokeWidth={1.5} /> Email
          </span>
          <span className="vp-label !text-[0.58rem] opacity-60 normal-case tracking-normal">{site.email}</span>
        </a>
      </div>
    </div>
  );
}

export default function Contact() {
  const { mode } = useMode();
  const [tab, setTab] = useState<Tab>('project');

  // Follow the visitor's choice, but let them switch here without changing it.
  useEffect(() => {
    if (mode) setTab(mode === 'studio' ? 'hiring' : 'project');
  }, [mode]);

  return (
    <footer
      id="contact"
      data-section="Contact"
      data-index="09"
      className="relative px-5 sm:px-8 md:px-10 pt-24 sm:pt-32 pb-16 scroll-mt-16"
    >
      <Slate index="09" label="Contact" aside="I answer everything" />
      <div className="grid lg:grid-cols-12 gap-6 mt-8 sm:mt-10 items-end">
        <SectionTitle text="Let's talk" className="lg:col-span-7" />
        <Reveal as="p" delay={150} className="lg:col-span-5 text-[#D7E2EA]/65 font-light leading-relaxed text-[1rem] max-w-[480px]">
          {contact.body}
        </Reveal>
      </div>

      <Reveal delay={100} className="mt-12 sm:mt-16">
        <div role="tablist" aria-label="Why you are writing" className="inline-flex rounded-full border border-[#D7E2EA]/20 p-1 mb-10">
          {(['project', 'hiring'] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2.5 font-medium uppercase tracking-widest text-[0.7rem] transition-colors duration-300 ${
                tab === t ? 'bg-[#D7E2EA] text-black' : 'text-[#D7E2EA]/60 hover:text-[#D7E2EA]'
              }`}
            >
              {t === 'project' ? contactCopy.project.tab : contactCopy.hiring.tab}
            </button>
          ))}
        </div>
        <div role="tabpanel">{tab === 'project' ? <Brief /> : <Hiring />}</div>
      </Reveal>

      <Reveal delay={100} className="mt-20 sm:mt-28 border-t border-[#D7E2EA]/[0.12] pt-10">
        <span className="vp-label text-[#D7E2EA]/45">Or just write</span>
        <a
          href={`mailto:${site.email}`}
          className="vp-email block mt-3 font-black tracking-tight leading-none text-[#D7E2EA] break-all sm:break-normal"
          style={{ fontSize: 'clamp(1.35rem, 5.2vw, 5.2rem)' }}
        >
          <span>{site.email}</span>
        </a>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mt-12">
          <SocialLinks />
          <p className="vp-label text-[#D7E2EA]/35">
            © {new Date().getFullYear()} {site.name} · {site.role}
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
