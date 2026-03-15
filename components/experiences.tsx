'use client';
import React, { useState } from 'react';

const experiences = [
  {
    title: 'VSGA - Video Editing',
    org: 'Digitalent Kominfo',
    date: 'Mei 2024',
    year: '2024',
    desc: 'National video editing training & certification based on Indonesia\u2019s SKKNI standard.',
  },
  {
    title: 'Cloud Camp Ramadhan 2024',
    org: 'IDCloudHost',
    date: 'Mar 2024',
    year: '2024',
    desc: 'A Hackathon event for Developers, Designers and PMs to collaborate and build a project in one night.',
  },
  {
    title: 'Youngsters on the Air Camp 2023',
    org: 'International Amateur Radio Union (IARU) Region 3',
    date: 'Oct 2023',
    year: '2023',
    desc: 'Young Amateur Radio Operators camp to learn about radio communications technology innovations.',
  },
  {
    title: 'Orientation on Strengthening Kwartir Management Capacity',
    org: 'Indragiri Hilir Scout Movement',
    date: 'Sep 2023',
    year: '2023',
    desc: 'Kwartir Management Capacity Building for Scout Leaders in Indragiri Hilir.',
  },
  {
    title: 'Water Rescue Training',
    org: 'National Search And Rescue Agency',
    date: 'Mar 2023',
    year: '2023',
    desc: 'Training on water rescue techniques and skills for emergency situations.',
  },
  {
    title: 'Dicoding - Mobile Apps Developer',
    org: 'Kampus Merdeka x Dicoding',
    date: 'Aug - Dec 2022',
    year: '2022',
    desc: 'Certified Independent Study Program focusing on Android mobile development.',
  },
  {
    title: 'VSGA - Junior Web Developer',
    org: 'Digitalent Kominfo',
    date: 'Jun 2022',
    year: '2022',
    desc: 'National web development training & certification based on Indonesia\u2019s SKKNI standard.',
  },
  {
    title: 'ITTS Huawei Students Developer',
    org: 'Huawei Developer',
    date: 'Feb 2022',
    year: '2022',
    desc: 'Developing Android applications using Huawei Mobile Services and Developer Kit.',
  },
  {
    title: 'Focus Group Discussion Road to 2022 Digital Broadcasting and Analog-Switch Off (ASO)',
    org: 'Riau Regional Indonesian Broadcasting Commission',
    date: 'Nov 2021',
    year: '2021',
    desc: 'Analog to Digital Broadcasting transition discussion with local broadcasters.',
  },
  {
    title: 'Institutional Management Training in Context of National Assessment',
    org: 'Indragiri Hilir Education Dept.',
    date: 'Jun 2021',
    year: '2021',
    desc: 'Training for school staff on managing schools to meet national assessment standards.',
  },
  {
    title: 'Telkom Antares IoT',
    org: 'Telkom Indonesia & Antares',
    date: 'Jun 2020',
    year: '2020',
    desc: 'Hands-on IoT digital platform workshop, road to DILo Hackathon 2020.',
  },
  {
    title: 'Cyber Security Workshop',
    org: 'Garuda Cyber Indonesia',
    date: 'Dec 2019',
    year: '2019',
    desc: 'Learning cyber security basics, hacking methods, and social engineering.',
  },
  {
    title: 'Telkom Hands-On API MDD',
    org: 'Antares & BigBox',
    date: 'Jul 2019',
    year: '2019',
    desc: 'Two-day hands-on workshop about API MDD at DILo Pekanbaru.',
  },
  {
    title: 'Lailatul Coding',
    org: 'DILo Telkom Indonesia',
    date: 'May 2019',
    year: '2019',
    desc: 'Charity event to build a website in one night during Ramadan.',
  },
  {
    title: 'National Programming Contest',
    org: 'Schematics ITS',
    date: 'Aug 2018',
    year: '2018',
    desc: 'National-level algorithm & programming competition.',
  },
  {
    title: 'Algorithm Implementation Training',
    org: 'STMIK AMIK Riau',
    date: 'Oct 2017',
    year: '2017',
    desc: 'Pascal programming & algorithm implementation training.',
  },
];

const INITIAL_SHOW = 5;

export default function Experiences() {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? experiences : experiences.slice(0, INITIAL_SHOW);

  const visibleWithMeta = visible.map((exp, index) => ({
    ...exp,
    showYear: index === 0 || exp.year !== visible[index - 1].year,
  }));

  return (
    <section id='experiences' className='py-24 bg-linear-to-b from-[#0a0a0a] via-gray-900 to-gray-950 text-white'>
      <div className='max-w-4xl mx-auto px-6'>
        <h2 className='text-4xl font-bold text-center mb-16'>Experiences</h2>

        <div className='relative border-l border-gray-700'>
          {visibleWithMeta.map((exp, index) => {
            return (
              <React.Fragment key={index}>
                {/* Year divider */}
                {exp.showYear && (
                  <div className='relative pl-10 mb-4'>
                    <div className='absolute -left-[1px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-600' />
                    <span className='text-xs font-semibold tracking-widest text-yellow-400/70 uppercase'>
                      {exp.year}
                    </span>
                  </div>
                )}

                <div className='relative pl-10 mb-10 group'>
                  <div className='absolute -left-[9px] top-2'>
                    <div className='w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_3px_rgba(59,130,246,0.7)] group-hover:scale-125 transition-transform' />
                  </div>

                  <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 shadow-md group-hover:shadow-xl transition-all duration-300'>
                    <h3 className='text-base font-semibold leading-snug mb-1'>{exp.title}</h3>
                    <div className='flex flex-wrap items-center gap-x-3 gap-y-1 mb-3'>
                      <span className='text-xs text-yellow-400/80'>{exp.org}</span>
                      <span className='text-xs text-gray-400 bg-white/10 px-2 py-0.5 rounded-full'>{exp.date}</span>
                    </div>
                    <p className='text-gray-300 text-sm leading-relaxed'>{exp.desc}</p>
                  </div>
                </div>
              </React.Fragment>
            );
          })}

          {/* Fade overlay saat collapsed */}
          {!expanded && (
            <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none' />
          )}
        </div>

        {/* Toggle button */}
        <div className='flex justify-center mt-8'>
          <button
            onClick={() => setExpanded(!expanded)}
            className='flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors border border-white/10 hover:border-yellow-400/40 rounded-full px-6 py-2.5'
          >
            {expanded ? (
              <>Show less <span className='text-xs'>↑</span></>
            ) : (
              <>Show {experiences.length - INITIAL_SHOW} more experiences <span className='text-xs'>↓</span></>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}