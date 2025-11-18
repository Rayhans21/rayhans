'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section id='home' className='min-h-screen flex items-center px-6'>
      <div className='max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center md:items-start gap-16'>
        <div className='relative w-full md:w-1/2 flex justify-center md:justify-end'>
          <div className='relative w-[280px] md:w-[340px]'>
            <Image src='/RayhanTHAILAND.webp' alt='Foto Rayhan' width={340} height={420} className='object-cover select-none' priority />
            <h1
              className='absolute -left-4 md:-left-16 bottom-[45px] text-white font-bold leading-[0.95] tracking-tight drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)] 
                           text-6xl md:text-8xl'
            >
              Rayhan
              <span className='block text-yellow-400'>Syah.</span>
            </h1>
          </div>
        </div>

        <div className='w-full md:w-1/2 mt-10 md:mt-0'>
          <p className='text-sm tracking-widest text-yellow-300/90 mb-4'>— Introduction</p>

          <h2 className='text-3xl md:text-4xl font-bold text-white leading-snug mb-4 max-w-md'> Junior Web Developer and IoT Explorer</h2>

          <p className='text-white/70 leading-relaxed max-w-md mb-6'>I build clean and modern web interfaces, and explore IoT and radio technology through hands-on projects and experiments.</p>

          <div className='flex gap-6 items-center mb-4'>
            <a href='#story' className='text-yellow-400 font-medium text-base hover:text-yellow-300'>
              My story →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
