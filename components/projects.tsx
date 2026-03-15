import ProjectCard from './project-card';

export default function Projects() {
  const projects = [
    {
      title: 'MotoLog',
      description: 'Personal motorcycle dashboard with a custom SVG speedometer, digital odometer, fuel efficiency tracker, and maintenance status — featuring a password-protected private mode backed by Supabase.',
      tech: ['Next.js', 'TypeScript', 'Supabase', 'SVG'],
      link: 'https://rayhans.vercel.app/motolog',
      image: '', // tambahkan screenshot MotoLog dashboard
    },
    {
      title: 'MUSDA IX Donation Log',
      description: 'A transparent donation tracking system for ORARI\'s MUSDA IX event, pulling live data from Google Sheets with real-time search and visual status indicators.',
      tech: ['Next.js', 'TypeScript', 'Google Sheets API'],
      link: 'https://rayhans.vercel.app/musda',
      image: '/MUSDA_IX_REV2.png',
    },
    {
      title: 'QO-100 Transceiver Companion',
      description: 'An Arduino-based tool for FT-818 that reads frequency, mode, and performs LNB calibration for real-time QO-100 transponder monitoring.',
      tech: ['Arduino', 'C++', 'RF', 'IoT'],
      link: 'https://github.com/Rayhans21',
      image: '/dxportable.png',
    },
    {
      title: 'APRS Tracker & iGate',
      description: 'A lightweight APRS tracking and gateway system using IoT hardware for efficient amateur radio position reporting.',
      tech: ['Arduino', 'APRS', 'IoT'],
      link: 'https://github.com/Rayhans21',
      image: '',
    },
    {
      title: 'YC5NCM-13 Weather Station',
      description: 'A smart weather station that collects temperature, humidity, and pressure data, then transmits it via APRS or internet for real-time environmental monitoring.',
      tech: ['ESP8266', 'Sensors', 'APRS', 'IoT'],
      link: 'https://github.com/Rayhans21',
      image: '',
    },
  ];

  return (
    <section id='projects' className='w-full py-24 px-6 text-center'>
      <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>Projects</h2>

      <p className='text-white/70 max-w-xl text-base md:text-lg mb-12 mx-auto'>
        Best collection of projects I&apos;ve built.
      </p>

      <div className='flex flex-wrap justify-center gap-6 max-w-6xl mx-auto'>
        {projects.map((project) => (
          <div key={project.title} className='w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'>
            <ProjectCard
              title={project.title}
              description={project.description}
              tech={project.tech}
              link={project.link}
              image={project.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
}