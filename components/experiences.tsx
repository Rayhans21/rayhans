'use client';
import React from 'react';

const experiences = [
  {
    title: 'VSGA - Video Editing',
    org: 'Digitalent Kominfo',
    date: 'Mei 2024',
    desc: 'National video editing training & certification based on Indonesia’s SKKNI standard.',
  },
  {
    title: 'Cloud Camp Ramadhan 2024',
    org: 'IDCloudHost',
    date: 'Mar 2024',
    desc: 'A Hackathon event for Developers, Designers and PMs to collaborate and build a project in one night.',
  },
  {
    title: 'Youngsters on the Air Camp 2023',
    org: 'International Amateur Radio Union (IARU) Region 3',
    date: 'Oct 2023',
    desc: 'Young Amateur Radio Operators camp to learn about radio communications technology innovations.',
  },
  {
    title: 'Orientation on Strengthening Kwartir Management Capacity',
    org: 'Indragiri Hilir Scout Movement',
    date: 'Sep 2023',
    desc: 'Kwartir Management Capacity Building for Scout Leaders in Indragiri Hilir.',
  },
  {
    title: 'Water Rescue Training',
    org: 'National Search And Rescue Agency',
    date: 'Mar 2023',
    desc: 'Training on water rescue techniques and skills for emergency situations.',
  },
  {
    title: 'Dicoding - Mobile Apps Developer',
    org: 'Kampus Merdeka x Dicoding',
    date: 'Aug - Dec 2022',
    desc: 'Certified Independent Study Program focusing on Android mobile development.',
  },
  {
    title: 'VSGA - Junior Web Developer',
    org: 'Digitalent Kominfo',
    date: 'Jun 2022',
    desc: 'National web development training & certification based on Indonesia’s SKKNI standard.',
  },
  {
    title: 'ITTS Huawei Students Developer',
    org: 'Huawei Developer',
    date: 'Feb 2022',
    desc: 'Developing Android applications using Huawei Mobile Services and Developer Kit.',
  },
  {
    title: 'Focus Group Discussion Road to 2022 Digital Broadcasting and Analog-Switch Off (ASO)',
    org: 'Riau Regional Indonesian Broadcasting Commission',
    date: 'Nov 2021',
    desc: 'Analog to Digital Broadcasting transition discussion with local broadcasters.',
  },
  {
    title: 'Institutional Management Training in Context of National Assessment',
    org: 'Indragiri Hilir Education Dept.',
    date: 'Jun 2021',
    desc: 'Training for school staff on managing schools to meet national assessment standards.',
  },
  {
    title: 'Telkom Antares IoT',
    org: 'Telkom Indonesia & Antares',
    date: 'Jun 2020',
    desc: 'Hands-on IoT digital platform workshop, road to DILo Hackathon 2020.',
  },
  {
    title: 'Cyber Security Workshop',
    org: 'Garuda Cyber Indonesia',
    date: 'Dec 2019',
    desc: 'Learning cyber security basics, hacking methods, and social engineering.',
  },
  {
    title: 'Telkom Hands-On API MDD',
    org: 'Antares & BigBox',
    date: 'Jul 2019',
    desc: 'Two-day hands-on workshop about API MDD at DILo Pekanbaru.',
  },
  {
    title: 'Lailatul Coding',
    org: 'DILo Telkom Indonesia',
    date: 'May 2019',
    desc: 'Charity event to build a website in one night during Ramadan.',
  },
  {
    title: 'National Programming Contest',
    org: 'Schematics ITS',
    date: 'Aug 2018',
    desc: 'National-level algorithm & programming competition.',
  },
  {
    title: 'Algorithm Implementation Training',
    org: 'STMIK AMIK Riau',
    date: 'Oct 2017',
    desc: 'Pascal programming & algorithm implementation training.',
  },
];

export default function Experiences() {
  return (
    <section id='experiences' className='py-24 bg-linear-to-b from-[#0a0a0a] via-gray-900 to-gray-950 text-white'>
      <div className='max-w-4xl mx-auto px-6'>
        <h2 className='text-4xl font-bold text-center mb-16'>Experiences</h2>

        <div className='relative border-l border-gray-700'>
          {experiences.map((exp, index) => (
            <div key={index} className='relative pl-10 mb-12 group'>
              <div className='absolute -left-[9px] top-2'>
                <div className='w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_3px_rgba(59,130,246,0.7)] group-hover:scale-125 transition-transform'></div>
              </div>

              <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 shadow-md group-hover:shadow-xl transition-all duration-300'>
                <h3 className='text-xl font-semibold'>{exp.title}</h3>

                <p className='text-sm text-gray-400 mt-1'>
                  {exp.org} • {exp.date}
                </p>

                <p className='text-gray-300 mt-3 leading-relaxed'>{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
