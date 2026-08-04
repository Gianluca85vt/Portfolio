type LiveProjectButtonProps = {
  href?: string;
  label?: string;
  className?: string;
};

export default function LiveProjectButton({
  href = '#',
  label = 'Live Project',
  className = '',
}: LiveProjectButtonProps) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className={`inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest whitespace-nowrap px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors duration-300 hover:bg-[#D7E2EA]/10 ${className}`}
    >
      {label}
    </a>
  );
}
