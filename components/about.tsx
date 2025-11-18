export default function About() {
  return (
    <section id='about' className='w-full py-24 px-6 flex flex-col items-center text-center'>
      <h2 className='text-3xl md:text-4xl font-bold text-white mb-8'>About Me</h2>

      <div className='max-w-3xl text-white/80 space-y-6 text-base md:text-lg leading-relaxed fade-in'>
        <p>
          Hi, I’m <span className='font-semibold text-white'>Rayhan (YC5NCM)</span> — an amateur radio with a deep curiosity for web development, IoT, and satellite communication. I love exploring how software, hardware, and communication
          systems intersect to create real and meaningful solutions.
        </p>
        <p>
          With a background in Information Systems, I combine practical engineering, hands-on experimentation, and clean interface design. My work spans from frontend development and UI/UX design to building IoT prototypes, satellite
          communication setups, signal monitoring tools, and custom electronics for amateur radio operations.
        </p>
        <p>
          I enjoy turning ideas into working projects—fast, simple, and efficient. My goal is to create technology that is not only functional but enjoyable, and to continue sharing knowledge through open-source projects, experiments, and
          community activities.
        </p>
      </div>
    </section>
  );
}
