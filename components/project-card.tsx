import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

export default function ProjectCard({ title, description, tech, link }: ProjectCardProps) {
  return (
    <div className='bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition'>
      <h3 className='text-xl font-semibold text-white mb-2'>{title}</h3>

      <p className='text-white/60 text-sm mb-4'>{description}</p>

      <div className='flex flex-wrap gap-2 mb-4'>
        {tech.map((t) => (
          <span key={t} className='text-xs bg-white/10 px-2 py-1 rounded-md text-white/80'>
            {t}
          </span>
        ))}
      </div>

      {link && (
        <a href={link} target='_blank' className='text-sm text-indigo-400 hover:underline'>
          View Repository →
        </a>
      )}
    </div>
  );
}
