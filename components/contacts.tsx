'use client';

import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function ContactSection() {
  return (
    <section id='contact' className='w-full py-24 px-6 bg-linear-to-b from-gray-950 via-gray-900 to-black'>
      <div className='max-w-5xl mx-auto text-center'>
        <p className='text-sm tracking-widest text-yellow-400/90 mb-3'>— Contact</p>

        <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>Let&apos;s build something amazing together.</h2>

        <p className='text-white/60 max-w-2xl mx-auto text-base md:text-lg mb-12'>Feel free to reach out for collaborations, project inquiries, or anything you&apos;d like to create. I&apos;m open to new opportunities and conversations.</p>

        <div className='bg-gray-900/40 border border-white/10 backdrop-blur-md rounded-2xl p-10 md:p-14 shadow-xl'>
          <div className='flex flex-col sm:flex-row justify-center items-center gap-12'>
            <a href='https://www.instagram.com/muhammadrayhans' target='_blank' rel='noopener noreferrer' className='group flex flex-col items-center text-white/80 hover:text-white transition'>
              <div className='p-4 bg-gray-800/60 rounded-full group-hover:bg-gray-800 transition shadow-lg'>
                <FaInstagram size={36} />
              </div>
              <span className='mt-3 text-sm opacity-80'>Instagram</span>
            </a>

            <a href='https://github.com/Rayhans21' target='_blank' rel='noopener noreferrer' className='group flex flex-col items-center text-white/80 hover:text-white transition'>
              <div className='p-4 bg-gray-800/60 rounded-full group-hover:bg-gray-800 transition shadow-lg'>
                <FaGithub size={36} />
              </div>
              <span className='mt-3 text-sm opacity-80'>GitHub</span>
            </a>

            <a href='https://linkedin.com/in/muhammadrayhans' target='_blank' rel='noopener noreferrer' className='group flex flex-col items-center text-white/80 hover:text-white transition'>
              <div className='p-4 bg-gray-800/60 rounded-full group-hover:bg-gray-800 transition shadow-lg'>
                <FaLinkedin size={36} />
              </div>
              <span className='mt-3 text-sm opacity-80'>LinkedIn</span>
            </a>
          </div>

          <div className='w-full h-px bg-white/10 my-12'></div>

          <a href='mailto:rey.5ncm@gmail.com' className='inline-block px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-yellow-300 transition shadow-lg'>
            Send me a message →
          </a>
        </div>
      </div>
    </section>
  );
}
