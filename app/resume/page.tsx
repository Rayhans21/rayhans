'use client';

import s from './resume.module.css';
import Image from 'next/image';

export default function ResumePage() {
  const handlePrintCV = () => {
    const originalTitle = document.title;
    document.title = 'MuhammadRayhanSyah_CV_Academy';
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 100);
  };

  return (
    <div className={s.root}>
      <button className={s.fabPrint} onClick={handlePrintCV} title='Download PDF CV'>
        <svg width='24' height='24' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
          ></path>
        </svg>
      </button>

      {/* ───────────────────────────────────────────────────────── */}
      {/* 📄 HALAMAN 1 (A4 PORTRAIT) */}
      {/* ───────────────────────────────────────────────────────── */}
      <div className={s.page}>
        {/* HEADER & FOTO */}
        <div className={s.headerGrid}>
          <div className={s.photoWrapper}>
            <Image
              src='/RayhanTHAILAND.webp' // Pastikan foto profilmu bernama profile.jpg di folder public/
              alt='Muhammad Rayhan Syah'
              width={150}
              height={150}
              sizes='150px'
              className={s.profileImg}
              priority
            />
          </div>
          <div className={s.headerText}>
            <h1 className={s.name}>Muhammad Rayhan Syah</h1>
            <p className={s.profession}>Independent Developer · IoT Builder · Amateur Radio Operator YC5NCM</p>
          </div>
        </div>

        {/* OBJECTIVE */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Objective</h2>
          <p className={s.textContent}>
            Self-driven developer and systems builder with a background in Information Systems, exploring the intersection of software, embedded technology, and communication systems. I enjoy turning real-world problems into practical tools
            from community-driven web platforms and IoT prototypes to amateur radio solutions used in everyday operations. Through Apple Developer Academy, I want to strengthen my product thinking, collaborate with multidisciplinary teams,
            and create meaningful digital experiences that genuinely improve how people live and communicate.
          </p>
        </section>

        {/* EDUCATION */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Education</h2>
          <div className={s.itemGroup}>
            <div className={s.itemHeader}>
              <h3 className={s.itemRole}>S1 Sistem Informasi (Information Systems)</h3>
              <span className={s.itemDate}>2025</span>
            </div>
            <p className={s.itemCompany}>Universitas Islam Indragiri, Riau</p>
            <p className={s.textContent} style={{ marginTop: '4px' }}>
              <strong>Relevant coursework:</strong> Database Systems, Software Engineering, Network & Communication Systems, Mobile App Dev
            </p>
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Work Experience</h2>

          <div className={s.itemGroup}>
            <div className={s.itemHeader}>
              <h3 className={s.itemRole}>Information Technology Lead</h3>
              <span className={s.itemDate}>Sep 2021 - Sep 2025</span>
            </div>
            <p className={s.itemCompany}>PT. Radio Indragiri Mandiri (Part-time)</p>
            <ul className={s.bulletList}>
              <li>Helped lead the digital transformation of a regional radio broadcaster over 4 years, contributing to technology strategy, licensing, and infrastructure decisions.</li>
              <li>Supported the transition from conventional workflows into digital systems on-air operations.</li>
              <li>Acted as a bridge between technical implementation teams and non-technical stakeholders, helping management make technology decisions more confidently.</li>
            </ul>
          </div>

          <div className={s.itemGroup}>
            <div className={s.itemHeader}>
              <h3 className={s.itemRole}>Technical Operations (HT Sales & Rentals)</h3>
              <span className={s.itemDate}>Oct 2023 - Present</span>
            </div>
            <p className={s.itemCompany}>NCM Riau</p>
            <ul className={s.bulletList}>
              <li>Designed and developed the database structure and operational logic for a handheld transceiver rental and sales system used by local community operations.</li>
              <li>Replaced manual bookkeeping processes with automated rental tracking and real-time stock availability management, reducing operational complexity for non-technical users.</li>
            </ul>
          </div>

          <div className={s.itemGroup}>
            <div className={s.itemHeader}>
              <h3 className={s.itemRole}>Mobile Apps Developer (Assistant Role)</h3>
              <span className={s.itemDate}>Jan 2023 - Jan 2025</span>
            </div>
            <p className={s.itemCompany}>Indonesia Cerdas Team (Kampus Merdeka)</p>
            <ul className={s.bulletList}>
              <li>Contributed to the development and maintenance of mobile applications for competency assessment platforms.</li>
              <li>Contributed UI improvements and feature maintenance across multiple assessment cycles.</li>
            </ul>
          </div>

          <div className={s.itemGroup}>
            <div className={s.itemHeader}>
              <h3 className={s.itemRole}>Attendance Management System Operator</h3>
              <span className={s.itemDate}>Oct 2020 - Aug 2021</span>
            </div>
            <p className={s.itemCompany}>Tasik Gemilang Foundation</p>
            <ul className={s.bulletList}>
              <li>Managed installation and full data migration for a new digital attendance system, improving efficiency and reducing manual administrative workload.</li>
            </ul>
          </div>

          <div className={s.itemGroup}>
            <div className={s.itemHeader}>
              <h3 className={s.itemRole}>Audio Editor - Digital Radio</h3>
              <span className={s.itemDate}>Sep 2020 - Oct 2021</span>
            </div>
            <p className={s.itemCompany}>Green Radioline</p>
            <ul className={s.bulletList}>
              <li>Produced and edited audio content for a digital radio station during a two-month internship, extended to part-time.</li>
            </ul>
          </div>
        </section>

        {/* FOOTER HALAMAN 1 */}
        <footer className={s.footerTable}>
          <div className={s.footerCell}>
            <strong>Email:</strong> syahmrayhan02@gmail.com
          </div>
          <div className={s.footerCell}>
            <strong>Phone:</strong> 085263854182
          </div>
          <div className={s.footerCell}>
            <strong>LinkedIn:</strong> in/muhammadrayhans
          </div>
          <div className={s.footerCell}>
            <strong>GitHub:</strong> github.com/Rayhans21
          </div>
        </footer>
      </div>

      {/* ───────────────────────────────────────────────────────── */}
      {/* 📄 HALAMAN 2 (A4 PORTRAIT) */}
      {/* ───────────────────────────────────────────────────────── */}
      <div className={s.page}>
        {/* TECHNICAL SKILLS */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Skills</h2>
          <div className={s.skillsGrid}>
            <div>
              <p className={s.skillsCategory}>Programming & Web</p>
              <p className={s.textContent}>Python, JavaScript, TypeScript, HTML/CSS, Next.js, Git & GitHub, Supabase</p>
            </div>
            <div>
              <p className={s.skillsCategory}>Embedded & IoT</p>
              <p className={s.textContent}>Arduino, ESP32, RP2040, ESP8266, Orange Pi, Sensors, Serial Com, C++</p>
            </div>
            <div>
              <p className={s.skillsCategory}>Amateur Radio & RF</p>
              <p className={s.textContent}>APRS, LoRa, iGate Systems, Satellite Comm (QO-100, 10-86), RF Basics (YC5NCM Licensed Advance Class)</p>
            </div>
            <div>
              <p className={s.skillsCategory}>Mobile Development</p>
              <p className={s.textContent}>Android (Kotlin/Java), Kampus Merdeka Dicoding certified</p>
            </div>
          </div>
        </section>

        {/* TRAINING & CERTIFICATIONS */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Training & Certifications</h2>
          <div className={s.skillsGrid}>
            <div className={s.itemGroup}>
              <div className={s.itemHeader}>
                <h3 className={s.itemRole}>VSGA - Video Editing (SKKNI)</h3>
                <span className={s.itemDate}>2024</span>
              </div>
              <p className={s.itemCompany}>Digitalent Kominfo</p>
            </div>
            <div className={s.itemGroup}>
              <div className={s.itemHeader}>
                <h3 className={s.itemRole}>Cloud Camp Ramadhan Hackathon</h3>
                <span className={s.itemDate}>2024</span>
              </div>
              <p className={s.itemCompany}>IDCloudHost</p>
            </div>
            <div className={s.itemGroup}>
              <div className={s.itemHeader}>
                <h3 className={s.itemRole}>Mobile Apps Developer</h3>
                <span className={s.itemDate}>2022</span>
              </div>
              <p className={s.itemCompany}>Dicoding x Kampus Merdeka</p>
            </div>
            <div className={s.itemGroup}>
              <div className={s.itemHeader}>
                <h3 className={s.itemRole}>VSGA - Junior Web Developer</h3>
                <span className={s.itemDate}>2022</span>
              </div>
              <p className={s.itemCompany}>Digitalent Kominfo</p>
            </div>
            <div className={s.itemGroup}>
              <div className={s.itemHeader}>
                <h3 className={s.itemRole}>Water Rescue Training</h3>
                <span className={s.itemDate}>2023</span>
              </div>
              <p className={s.itemCompany}>National SAR Agency (BASARNAS)</p>
            </div>
            <div className={s.itemGroup}>
              <div className={s.itemHeader}>
                <h3 className={s.itemRole}>Kwartir Management Orientation</h3>
                <span className={s.itemDate}>2023</span>
              </div>
              <p className={s.itemCompany}>Indragiri Hilir Scout Movement</p>
            </div>
          </div>
        </section>

        {/* INTERPERSONAL SKILLS */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Interpersonal Skills</h2>
          <ul className={s.bulletList}>
            <li>Comfortable working in highly self-directed environments, many of my projects started from personal curiosity or real operational problems without formal briefs.</li>
            <li>Experienced in translating technical systems into practical tools usable by non-technical communities and organizations.</li>
            <li>Strong interdisciplinary curiosity across software, embedded systems, communication technology, and digital infrastructure.</li>
            <li>Enjoy collaborative problem-solving and continuously learning through experimentation, prototyping, and real-world implementation.</li>
          </ul>
        </section>

        {/* FOOTER HALAMAN 2 */}
        <footer className={s.footerTable}>
          <div className={s.footerCell}>
            <strong>Email:</strong> syahmrayhan02@gmail.com
          </div>
          <div className={s.footerCell}>
            <strong>Phone:</strong> 085263854182
          </div>
          <div className={s.footerCell}>
            <strong>LinkedIn:</strong> in/muhammadrayhans
          </div>
          <div className={s.footerCell}>
            <strong>GitHub:</strong> github.com/Rayhans21
          </div>
        </footer>
      </div>
    </div>
  );
}
