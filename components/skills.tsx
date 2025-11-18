export default function Skills() {
  const skills = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Git & GitHub', 'Linux'];

  return (
    <section id='skills' className='w-full py-24 px-6 flex flex-col items-center text-center'>
      <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>Skills & Tech Stack</h2>

      <p className='text-white/70 max-w-xl text-base md:text-lg mb-12'>Tools and technologies I use to build fast, modern, and responsive web applications.</p>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl'>
        {skills.map((skill) => (
          <div key={skill} className='bg-white/5 border border-white/10 text-white py-3 rounded-md hover:bg-white/10 transition font-medium'>
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
