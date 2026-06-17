'use client';

import s from './porto.module.css';
import Image from 'next/image';

// ─── DATA PROYEK ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num: '01',
    title: 'Personal Web Portfolio',
    subtitle: 'Web App · Developer Identity · Full Stack',
    tags: ['Next.js', 'React', 'CSS Modules'],
    orientation: 'landscape', // Layout Atas-Bawah
    summary: 'A comprehensive personal portfolio website serving as my digital identity, centralizing my projects, experiences, and technical explorations in a clean, print-ready layout.',
    origin: 'Self-initiated — establishing a professional digital presence',
    role: 'Solo Developer · Design & Full Stack',
    impacts: [
      'Built a responsive, highly performant web portfolio from scratch.',
      'Showcases cross-disciplinary projects ranging from web development to RF engineering.',
      'Engineered a pixel-perfect layout that exports flawlessly to PDF directly from the browser.',
    ],
    learnings: 'Learned to design for personal branding, focusing on clean typography, accessibility, and advanced CSS print media queries (@media print) for document generation.',
    link: 'https://rayhans.vercel.app/',
    image: '/web-porto-preview.png',
  },
  {
    num: '02',
    title: 'YOTA Indonesia Platform',
    subtitle: 'Web Portal · National Community Movement',
    tags: ['Next.js', 'Tailwind CSS', 'Community Platform'],
    orientation: 'landscape', // Layout Atas-Bawah
    summary: 'A dedicated, modern digital portal built for Youth on the Air (YOTA) Indonesia to empower, coordinate, and showcase the next generation of amateur radio operators nationwide.',
    origin: 'Community-driven — modernizing legacy organizational workflow',
    role: 'Solo Developer · Full Stack & UI Design',
    impacts: [
      'Centralized digital resources and event tracking for young radio operators across Indonesia.',
      'Modernized the branding and image of amateur radio movement through current web standards.',
      'Shipped to production with clean, fast-loading responsive components.',
    ],
    learnings: 'Sharpened my product empathy by designing specifically for youth engagement. Learned how to translate a national movement into a scalable and accessible web identity.',
    link: 'https://yota.vercel.app/',
    image: '/yota-preview.png',
  },
  {
    num: '03',
    title: 'MotoLog',
    subtitle: 'Web App · Personal Product · Full Stack',
    tags: ['Next.js', 'Supabase', 'Custom SVG'],
    orientation: 'portrait', // Layout Kiri-Kanan
    summary: 'A personal motorcycle management dashboard tracking fuel efficiency, service intervals, and history with a custom SVG speedometer backed by Supabase.',
    origin: 'Self-initiated — solving my own daily problem as a motorcycle owner',
    role: 'Solo Developer · Full product (design, frontend, backend)',
    impacts: ['Designed and built a custom animated SVG speedometer drawn from scratch.', 'Implemented database backend with auth for cross-device use.', 'Calculates real fuel efficiency per refuel entry over time.'],
    learnings: 'Taught me end-to-end product ownership. I learned to scope feature sets without over-engineering and wire a modern frontend cleanly to a database.',
    link: 'https://rayhans.vercel.app/motolog',
    image: '/motolog-preview.png',
  },
  {
    num: '04',
    title: 'MUSDA IX Donation Log',
    subtitle: 'Web App · Civic Tech · Community',
    tags: ['Next.js', 'Google Sheets API', 'Real-time Transparency'],
    orientation: 'landscape', // Layout Atas-Bawah
    summary: "A live donation tracking dashboard for ORARI's MUSDA IX conference. Updates to a Google Sheet reflect in real-time, providing transparency.",
    origin: 'Self-initiated — saw the need directly as an active ORARI member',
    role: 'Solo Developer · Full Stack',
    impacts: ['Replaced a manual spreadsheet process with a public live dashboard.', 'Allowed non-technical committee members to update data with zero training.', 'Archived as a permanent public transparency record of the event.'],
    learnings: 'The biggest lesson was designing for trust. Clear timestamps and source attribution were vital. I also learned simpler backends mean higher adoption.',
    link: 'https://rayhans.vercel.app/musda',
    image: '/musda-preview.png',
  },
  {
    num: '05',
    title: 'Embedded Systems & IoT Explorations',
    subtitle: 'Hardware Prototyping · Microcontrollers · RF',
    tags: ['ESP32 / Arduino', 'C++', 'IoT Architecture'],
    orientation: 'landscape', // Diubah menjadi Layout Atas-Bawah (Sesuai foto breadboard)
    summary: 'A collection of various hardware prototyping and IoT projects, including GPS-enabled trackers, environmental monitoring stations, and custom RF communication tools.',
    origin: 'Self-initiated — pushing the boundaries of physical computing',
    role: 'Solo Builder · Hardware Design, Firmware, Testing',
    impacts: [
      'Prototyped and deployed custom hardware solutions for real-world environmental and spatial tracking.',
      'Successfully integrated diverse sensors and modules (GPS, OLED displays, LoRa) into cohesive embedded systems.',
      'Bridged the physical world to digital platforms via cloud uplinks and amateur radio networks (APRS).',
    ],
    learnings: 'Hardware development is unforgiving. Working with physical components taught me to manage strict power constraints, debug circuitry logic, and optimize C++ code for low-memory microcontrollers.',
    link: 'https://github.com/Rayhans21', // Link Github dimasukkan
    image: '/iot-preview.jpg', // Nama file foto barumu
  },
];

export default function PortoPage() {
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = 'MuhammadRayhanSyah_Portfolio_Academy';
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 100);
  };

  return (
    <div className={s.root}>
      <button className={s.fabPrint} onClick={handlePrint} title='Download PDF Portfolio'>
        🖨
      </button>

      {/* ── COVER PAGE ── */}
      <div className={`${s.page} ${s.portrait}`}>
        <div className={s.pageInnerCover}>
          <div className={s.coverContent}>
            <p className={s.coverLabel}>PORTFOLIO 2026</p>
            <h1 className={s.coverName}>
              Muhammad
              <br />
              <span>Rayhan</span> Syah
            </h1>
            <p className={s.coverTagline}>Software & Hardware Developer · Amateur Radio Operator YC5NCM</p>
            <div className={s.coverHorizontalLineRed} />
            <p className={s.coverStatement}>
              I&apos;m a developer passionate about bridging software development with hardware and radio frequency integration. I build functional, data-driven web tools designed to solve practical, real-world problems for communities.
            </p>
          </div>
        </div>
      </div>

      {/* ── PROJECT PAGES ── */}
      {PROJECTS.map((p) => {
        const isLandscape = p.orientation === 'landscape';
        const pageClass = `${s.page} ${isLandscape ? s.landscape : s.portrait}`;

        return (
          <div key={p.num} className={pageClass}>
            <div className={`${s.pageInner} ${isLandscape ? s.layoutLand : s.layoutPort}`}>
              <div className={s.borderAccentRed} />
              <div className={s.borderAccentBlue} />

              {isLandscape ? (
                /* LAYOUT LANDSCAPE (Gambar 60% Di Atas, Teks Di Bawah) */
                <>
                  <div className={s.imgAreaLand}>
                    {p.image ? (
                      <Image src={p.image} alt={p.title} fill className={s.projectImg} priority />
                    ) : (
                      <div className={s.imagePlaceholder}>
                        <p>Photo Showcase</p>
                      </div>
                    )}
                  </div>

                  <div className={s.contentAreaLand}>
                    <div className={s.projectHeaderLand}>
                      <div className={s.projectMetaLeft}>
                        <h2 className={s.projectTitle}>
                          <span className={s.numRed}>{p.num}.</span> {p.title}
                        </h2>
                        <p className={s.projectSubtitle}>{p.subtitle}</p>
                        <div className={s.tagRow}>
                          {p.tags.map((t) => (
                            <span key={t} className={s.tag}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={s.projectMetaRight}>
                        <div className={s.metaRightCol}>
                          <h3 className={s.headerSmallBlue}>Origin</h3>
                          <p className={s.textSmall}>{p.origin}</p>
                        </div>
                        <div className={s.metaRightCol}>
                          <h3 className={s.headerSmallBlue}>Role</h3>
                          <p className={s.textSmall}>{p.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className={s.gridLand}>
                      <div>
                        <section className={s.section}>
                          <h3 className={s.headerBlue}>Summary</h3>
                          <p className={s.textRegular}>{p.summary}</p>
                        </section>
                      </div>
                      <div>
                        <section className={s.section}>
                          <h3 className={s.headerBlue}>Impact & Contribution</h3>
                          <ul className={s.bulletList}>
                            {p.impacts.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        </section>
                      </div>
                      <div className={s.columnEnd}>
                        <section className={s.section}>
                          <h3 className={s.headerBlue}>What I Learned</h3>
                          <p className={s.textRegular}>{p.learnings}</p>
                        </section>
                        {p.link && (
                          <a href={p.link} target='_blank' rel='noreferrer' className={s.projectLinkBlue}>
                            🔗 {p.link.replace('https://', '')}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* LAYOUT PORTRAIT (Teks Kiri, Gambar Kanan Vertikal) */
                <>
                  <div className={s.contentAreaPort}>
                    <div className={s.projectHeader}>
                      <div className={s.projectMetaLeft}>
                        <h2 className={s.projectTitle}>
                          <span className={s.numRed}>{p.num}.</span> {p.title}
                        </h2>
                        <p className={s.projectSubtitle}>{p.subtitle}</p>
                        <div className={s.tagRow}>
                          {p.tags.map((t) => (
                            <span key={t} className={s.tag}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={s.gridPort}>
                      <section className={s.section}>
                        <h3 className={s.headerBlue}>Summary</h3>
                        <p className={s.textRegular}>{p.summary}</p>
                      </section>

                      <section className={s.sectionSmall}>
                        <div className={s.metaGrid}>
                          <div>
                            <h3 className={s.headerSmallBlue}>Origin</h3>
                            <p className={s.textSmall}>{p.origin}</p>
                          </div>
                          <div>
                            <h3 className={s.headerSmallBlue}>Role</h3>
                            <p className={s.textSmall}>{p.role}</p>
                          </div>
                        </div>
                      </section>

                      <section className={s.section}>
                        <h3 className={s.headerBlue}>Impact & Contribution</h3>
                        <ul className={s.bulletList}>
                          {p.impacts.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </section>

                      <section className={s.section}>
                        <h3 className={s.headerBlue}>What I Learned</h3>
                        <p className={s.textRegular}>{p.learnings}</p>
                      </section>

                      {p.link && (
                        <a href={p.link} target='_blank' rel='noreferrer' className={s.projectLinkBlue} style={{ marginTop: 'auto' }}>
                          🔗 {p.link.replace('https://', '')}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className={s.imgAreaPort}>
                    {p.image ? (
                      <Image src={p.image} alt={p.title} sizes='100vw' fill className={s.projectImg} priority />
                    ) : (
                      <div className={s.imagePlaceholder}>
                        <p>Photo Showcase</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
