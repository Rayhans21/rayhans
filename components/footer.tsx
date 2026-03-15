import Link from 'next/link';

export default function Footer() {
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experiences', label: 'Experiences' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className='bg-black border-t border-white/10'>
      <div className='max-w-5xl mx-auto px-6 py-10'>

        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>

          {/* Quick links */}
          <div className='flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-white/40 hover:text-yellow-400 text-sm transition-colors'
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className='text-white/30 text-xs text-center whitespace-nowrap'>
            © {new Date().getFullYear()} Muhammad Rayhan Syah
          </p>

        </div>
      </div>
    </footer>
  );
}