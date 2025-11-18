'use client';
import { useEffect, useRef } from 'react';

interface Experience {
  role: string;
  company: string;
  year: string;
  description: string;
}

const experiences: Experience[] = [
  {
    role: 'Frontend Developer',
    company: 'Inovasi Teknologi Raya',
    year: '2025',
    description: 'Developing high-quality UI components and user experiences.',
  },
  {
    role: 'Network Access Engineering Intern',
    company: 'Telkomsel Sumbagteng',
    year: '2025',
    description: 'Supporting broadband access systems and field operations.',
  },
];

export default function Experiences() {
  const refs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('show');
        });
      },
      { threshold: 0.2 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className='w-full flex justify-center px-6 sm:px-10 md:px-20 lg:px-40 py-20'>
      <div className='relative w-full max-w-3xl'>
        {/* LINE */}
        <div className='timeline-line'></div>

        <div className='space-y-16'>
          {experiences.map((exp, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) refs.current[i] = el;
              }}
              style={{ ['--delay' as string]: `${i * 0.15}s` }}
              className='timeline-item fade-unit'
            >
              <div className='timeline-dot'></div>

              <div className='ml-12'>
                <h3 className='text-xl font-semibold'>{exp.role}</h3>
                <p className='text-sm opacity-70'>
                  {exp.company} • {exp.year}
                </p>
                <p className='mt-2 opacity-80'>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
