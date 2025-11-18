import ProjectCard from './project-card';

export default function Projects() {
  const projects = [
    {
      title: 'QO-100 Transceiver Companion',
      description: 'An Arduino-based tool for FT-818 that reads frequency, mode, and performs LNB calibration for real-time QO-100 transponder monitoring.',
      tech: ['Arduino', 'C++', 'RF', 'IoT'],
      link: 'https://github.com/Rayhans21',
    },
    {
      title: 'APRS Tracker & iGate',
      description: 'A lightweight APRS tracking and gateway system using IoT hardware for efficient amateur radio position reporting.',
      tech: ['Arduino', 'APRS', 'IoT'],
      link: 'https://github.com/Rayhans21',
    },
    {
      title: 'YC5NCM-13 Weather Station',
      description: 'A smart weather station that collects temperature, humidity, and pressure data, then transmits it via APRS or internet for real-time environmental monitoring.',
      tech: ['ESP8266', 'Sensors', 'APRS', 'IoT'],
      link: 'https://github.com/Rayhans21',
    },
  ];

  return (
    <section id='projects' className='w-full py-24 px-6 text-center'>
      <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>Projects</h2>

      <p className='text-white/70 max-w-xl text-base md:text-lg mb-12 mx-auto'>Best collection of projects I&apos;ve built.</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
        {projects.map((project) => (
          <ProjectCard key={project.title} title={project.title} description={project.description} tech={project.tech} link={project.link} />
        ))}
      </div>
    </section>
  );
}
