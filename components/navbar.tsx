'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Oleo_Script_Swash_Caps } from 'next/font/google';

const oleo = Oleo_Script_Swash_Caps({
  subsets: ['latin'],
  weight: ['400'],
});

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experiences', label: 'Experiences' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Detect active section
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className='max-w-5xl mx-auto px-4 py-4 flex justify-between items-center'>
        <Link href='/' className={`${oleo.className} text-white text-2xl`}>
          Rayhan&apos;s
        </Link>

        <div className='hidden md:flex gap-8'>
          {navLinks.map((link) => (
            <NavbarLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={activeSection === link.href.replace('#', '')}
            />
          ))}
        </div>

        <button onClick={() => setOpen(!open)} className='md:hidden text-white'>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className='md:hidden bg-black/90 backdrop-blur-xl text-white border-t border-white/10'>
          <div className='px-6 py-6 flex flex-col items-start space-y-6'>
            {navLinks.map((link) => (
              <NavbarLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={activeSection === link.href.replace('#', '')}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavbarLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative text-base tracking-wide py-2 transition-colors group ${
        active ? 'text-yellow-400' : 'text-white/70 hover:text-white'
      }`}
    >
      {label}
      {/* Underline indicator */}
      <span
        className={`absolute bottom-0 left-0 h-[2px] bg-yellow-400 transition-all duration-300 ${
          active ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </Link>
  );
}