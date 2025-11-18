'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Oleo_Script_Swash_Caps } from 'next/font/google';

const oleo = Oleo_Script_Swash_Caps({
  subsets: ['latin'],
  weight: ['400'],
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
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
          <NavbarLink href='#home' label='Home' />
          <NavbarLink href='#about' label='About' />
          <NavbarLink href='#projects' label='Projects' />
          <NavbarLink href='#contact' label='Contact' />
        </div>

        <button onClick={() => setOpen(!open)} className='md:hidden text-white'>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className='md:hidden bg-black/90 backdrop-blur-lg px-6 py-4 space-y-4 text-white'>
          <NavbarLink href='#home' label='Home' onClick={() => setOpen(false)} />
          <NavbarLink href='#about' label='About' onClick={() => setOpen(false)} />
          <NavbarLink href='#projects' label='Projects' onClick={() => setOpen(false)} />
          <NavbarLink href='#contact' label='Contact' onClick={() => setOpen(false)} />
        </div>
      )}
    </nav>
  );
}

function NavbarLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return (
    <Link href={href} className='text-white/90 hover:text-white transition-colors text-sm tracking-wide' onClick={onClick}>
      {label}
    </Link>
  );
}
