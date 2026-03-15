export default function Skills() {
  const skillGroups = [
    {
      group: 'Web Development',
      icon: '⬡',
      accent: 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5',
      dot: 'bg-yellow-400',
      items: [
        { name: 'JavaScript', icon: '▸' },
        { name: 'TypeScript', icon: '▸' },
        { name: 'React', icon: '▸' },
        { name: 'Next.js', icon: '▸' },
        { name: 'Tailwind CSS', icon: '▸' },
        { name: 'HTML', icon: '▸' },
        { name: 'CSS', icon: '▸' },
        { name: 'Supabase', icon: '▸' },
        { name: 'REST API', icon: '▸' },
      ],
    },
    {
      group: 'Embedded & IoT',
      icon: '⬡',
      accent: 'text-green-400 border-green-400/20 bg-green-400/5',
      dot: 'bg-green-400',
      items: [
        { name: 'Arduino', icon: '▸' },
        { name: 'ESP8266 / ESP32', icon: '▸' },
        { name: 'C/C++', icon: '▸' },
        { name: 'Sensors', icon: '▸' },
        { name: 'Serial Communication', icon: '▸' },
      ],
    },
    {
      group: 'Amateur Radio & RF',
      icon: '⬡',
      accent: 'text-blue-400 border-blue-400/20 bg-blue-400/5',
      dot: 'bg-blue-400',
      items: [
        { name: 'APRS', icon: '▸' },
        { name: 'iGate Systems', icon: '▸' },
        { name: 'QO-100', icon: '▸' },
        { name: 'RF Basics', icon: '▸' },
        { name: 'Satellite Communication', icon: '▸' },
      ],
    },
    {
      group: 'Tools & Systems',
      icon: '⬡',
      accent: 'text-purple-400 border-purple-400/20 bg-purple-400/5',
      dot: 'bg-purple-400',
      items: [
        { name: 'Git & GitHub', icon: '▸' },
        { name: 'Linux', icon: '▸' },
        { name: 'Shell Scripting', icon: '▸' },
        { name: 'Networking Basics', icon: '▸' },
        { name: 'Google Sheets API', icon: '▸' },
      ],
    },
  ];

  return (
    <section id='skills' className='w-full py-24 px-6 flex flex-col items-center text-center'>
      <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>Skills & Tech Stack</h2>

      <p className='text-white/70 max-w-2xl text-base md:text-lg mb-12'>
        Tools and technologies I use to build practical and innovative projects.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full'>
        {skillGroups.map(({ group, accent, dot, items }) => (
          <div
            key={group}
            className={`text-left rounded-2xl border p-6 ${accent}`}
          >
            {/* Header kategori */}
            <div className='flex items-center gap-3 mb-5'>
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
              <h3 className='text-base font-semibold text-white'>{group}</h3>
              <span className='ml-auto text-xs text-white/30'>{items.length} skills</span>
            </div>

            {/* Badge skills */}
            <div className='flex flex-wrap gap-2'>
              {items.map(({ name }) => (
                <span
                  key={name}
                  className='bg-white/5 border border-white/10 text-white/80 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-white/10 hover:text-white transition-colors'
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}