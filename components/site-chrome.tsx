'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === '/verify' || pathname.startsWith('/verify/');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={hideNavbar ? undefined : 'pt-16'}>{children}</div>
    </>
  );
}
