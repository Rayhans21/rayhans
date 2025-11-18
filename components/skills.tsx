export default function Skills() {
  const skillGroups = {
    'Web Development': ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS'],
    'Embedded & IoT': ['Arduino', 'ESP8266 / ESP32', 'C/C++', 'Sensors', 'Serial Communication'],
    'Amateur Radio & RF': ['APRS', 'iGate Systems', 'QO-100', 'RF Basics', 'Satellite Communication'],
    'Tools & Systems': ['Git & GitHub', 'Linux', 'Shell Scripting', 'Networking Basics'],
  };

  return (
    <section id='skills' className='w-full py-24 px-6 flex flex-col items-center text-center'>
      <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>Skills & Tech Stack</h2>

      <p className='text-white/70 max-w-2xl text-base md:text-lg mb-12'>Tools and technologies I use to build practical and innovative projects.</p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full'>
        {Object.entries(skillGroups).map(([group, items]) => (
          <div key={group} className='text-left'>
            <h3 className='text-xl font-semibold text-white mb-4'>{group}</h3>

            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
              {items.map((skill) => (
                <div
                  key={skill}
                  className='bg-white/5 border border-white/10 text-white py-2 rounded-md text-sm text-center
                             hover:bg-white/10 transition font-medium'
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
