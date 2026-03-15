import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  image?: string;
}

export default function ProjectCard({ title, description, tech, link, image }: ProjectCardProps) {
  return (
    <div className='bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 flex flex-col'>

      {/* Image / placeholder */}
      <div className='relative w-full h-44 bg-white/5 overflow-hidden'>
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className='object-cover'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            <span className='text-white/20 text-sm'>No preview</span>
          </div>
        )}
        {/* Subtle gradient overlay bawah */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />
      </div>

      <div className='p-6 flex flex-col flex-1'>
        <h3 className='text-base font-semibold text-white mb-2 leading-snug'>{title}</h3>

        <p className='text-white/60 text-sm mb-4 leading-relaxed flex-1'>{description}</p>

        <div className='flex flex-wrap gap-2 mb-5'>
          {tech.map((t) => (
            <span key={t} className='text-xs bg-white/10 px-2.5 py-1 rounded-full text-white/70'>
              {t}
            </span>
          ))}
        </div>

        {link && (
          <a
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            className='text-xs font-medium text-yellow-400 hover:text-yellow-300 transition-colors'
          >
            View Repository →
          </a>
        )}
      </div>
    </div>
  );
}