// components/Footer.tsx

export default function Footer() {
  return (
    <footer className='bg-black text-gray-400 py-8 border-t border-white/10'>
      <div className='container mx-auto px-4 text-center space-y-1'>
        <p className='text-sm opacity-60'>© {new Date().getFullYear()} Muhammad Rayhan Syah. All rights reserved.</p>

        <p className='text-sm'>
          Created by{' '}
          <a href='https://www.instagram.com/muhammadrayhans' target='_blank' rel='noopener noreferrer' className='underline hover:text-yellow-400 transition'>
            @muhammadrayhans
          </a>
        </p>
      </div>
    </footer>
  );
}
