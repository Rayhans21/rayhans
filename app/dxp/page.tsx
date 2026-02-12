export default function Page() {
  return (
    <main className='bg-[#f5f7f6] text-gray-800'>
      {/* HERO */}
      <section className='max-w-6xl mx-auto pt-6 px-4'>
        <div className="bg-[url('/RayhanTHAILAND.webp')] bg-cover bg-center rounded-3xl p-16 text-white relative overflow-hidden">
          <div className='bg-black/40 absolute inset-0 rounded-3xl' />
          <div className='relative z-10 text-center'>
            <p className='text-sm opacity-80'>WELCOME TO DXPORTABLE AMATEUR RADIO</p>
            <h1 className='text-4xl font-semibold mt-2'>One Platform</h1>
            <h2 className='text-3xl font-light'>Multiple Activation Programs</h2>
            <p className='mt-4 max-w-2xl mx-auto text-sm opacity-90'>DXPortable unites multiple amateur radio outdoor programs into a single platform connecting operators, locations, and communities across Indonesia and beyond.</p>
            <div className='mt-6 flex justify-center gap-4'>
              <button className='bg-white text-black px-6 py-2 rounded-full text-sm'>Explore Now</button>
              <button className='bg-green-600 px-6 py-2 rounded-full text-sm'>Start Activation</button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className='max-w-6xl mx-auto px-4 mt-10 grid grid-cols-2 md:grid-cols-4 gap-6'>
        {[
          { n: '25', t: 'Total Programs Listed Here' },
          { n: '125', t: 'Total Activation Listed Here' },
          { n: '3K+', t: 'Total User Registered Here' },
          { n: '3', t: 'Total Admin Who Manages Here' },
        ].map((s, i) => (
          <div key={i} className='bg-white p-6 rounded-2xl shadow-sm text-center'>
            <div className='text-2xl font-bold text-green-600'>{s.n}</div>
            <div className='text-sm mt-2'>{s.t}</div>
          </div>
        ))}
      </section>

      {/* ABOUT */}
      <section className='max-w-6xl mx-auto px-4 mt-20'>
        <p className='text-green-600 text-center text-sm'>About DXPortable</p>
        <h2 className='text-center text-2xl font-semibold mt-2'>Discover DXPortable as an Outdoor Amateur Radio Ecosystem</h2>

        <div className='grid md:grid-cols-2 gap-8 mt-10'>
          <div className='space-y-4'>
            {['Global Community', 'Learning & Sharing', 'Adventure Spirit', 'Outdoor Activation'].map((item, i) => (
              <div key={i} className='bg-white p-4 rounded-xl shadow-sm'>
                <div className='font-semibold text-sm'>{item}</div>
                <div className='text-xs opacity-70 mt-1'>Connecting radio operators and sharing knowledge across outdoor locations.</div>
              </div>
            ))}
          </div>

          <div className='bg-green-700 rounded-2xl h-56' />
        </div>
      </section>

      {/* PROGRAM */}
      <section className='max-w-6xl mx-auto px-4 mt-20'>
        <p className='text-green-600 text-center text-sm'>Our Program</p>
        <h2 className='text-center text-2xl font-semibold mt-2'>Explore a Wide Range of DXPortable Activity Programs</h2>

        <div className='grid md:grid-cols-4 gap-6 mt-10'>
          {['iBOTA', 'iPOTA', 'iSOTA', 'AOTA'].map((p, i) => (
            <div key={i} className='bg-white rounded-2xl p-4 shadow-sm'>
              <div className='h-32 bg-gray-200 rounded-lg' />
              <h3 className='mt-4 font-semibold'>{p}</h3>
              <p className='text-xs opacity-70 mt-2'>Amateur radio activation program across outdoor locations.</p>
              <button className='mt-4 w-full bg-green-600 text-white py-2 rounded-lg text-sm'>Start Activation</button>
            </div>
          ))}
        </div>
      </section>

      {/* NEWS */}
      <section className='max-w-6xl mx-auto px-4 mt-20'>
        <p className='text-green-600 text-center text-sm'>Latest News</p>
        <h2 className='text-center text-2xl font-semibold mt-2'>Recent Highlights from DXPortable Activities</h2>

        <div className='grid md:grid-cols-2 gap-6 mt-10'>
          <div className='bg-white rounded-2xl p-6 shadow-sm'>
            <div className='h-40 bg-gray-200 rounded-lg mb-4' />
            <h3 className='font-semibold'>Improved Activation Logging System Released</h3>
            <p className='text-sm opacity-70 mt-2'>The latest update introduces a cleaner log submission process and faster approval.</p>
          </div>

          <div className='bg-green-600 text-white rounded-2xl p-6'>
            <h3 className='font-semibold'>Improved Activation Logging System Released</h3>
            <p className='text-sm mt-2 opacity-90'>Helping operators submit logs more accurately and efficiently.</p>
          </div>
        </div>
      </section>

      {/* LEADERS */}
      <section className='max-w-6xl mx-auto px-4 mt-20'>
        <p className='text-green-600 text-center text-sm'>5 Top Leaders</p>
        <h2 className='text-center text-2xl font-semibold mt-2'>Recognizing outstanding contributors within the DXPortable community</h2>

        <div className='grid md:grid-cols-3 gap-6 mt-10'>
          {['ROLL OF HONOR', 'TOP SPONSOR', 'TOP ACTIVATOR'].map((t, i) => (
            <div key={i} className='bg-white p-6 rounded-2xl shadow-sm text-center'>
              <div className='font-semibold'>{t}</div>
              <div className='mt-6 h-32 bg-green-100 rounded-xl' />
              <button className='mt-6 w-full bg-green-600 text-white py-2 rounded-lg'>Button</button>
            </div>
          ))}
        </div>
      </section>

      {/* CONNECT */}
      <section className='max-w-6xl mx-auto px-4 mt-20'>
        <div className='bg-green-700 text-white rounded-3xl p-12 text-center'>
          <h2 className='text-2xl font-semibold'>Let’s Connect On The Air</h2>
          <p className='text-sm mt-2 opacity-90'>Connect with amateur radio operators worldwide and grow together.</p>
          <button className='mt-6 bg-white text-green-700 px-6 py-2 rounded-full'>Join Us</button>
        </div>
      </section>

      {/* CONTACT */}
      <section className='max-w-6xl mx-auto px-4 mt-20'>
        <h2 className='text-center text-2xl font-semibold'>We’re here to support your DX journey</h2>

        <div className='grid md:grid-cols-2 gap-6 mt-10'>
          <div className='bg-gray-200 h-72 rounded-2xl' />
          <div className='bg-white p-6 rounded-2xl shadow-sm'>
            <input placeholder='Name' className='w-full border p-2 rounded mb-3' />
            <input placeholder='Email' className='w-full border p-2 rounded mb-3' />
            <textarea placeholder='Message' className='w-full border p-2 rounded mb-3' />
            <button className='w-full bg-green-600 text-white py-2 rounded-lg'>Send Message</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className='bg-green-700 text-white mt-20 rounded-t-3xl p-10'>
        <div className='max-w-6xl mx-auto grid md:grid-cols-4 gap-6 text-sm'>
          <div>
            <div className='font-semibold mb-3'>Information</div>
            <p>DXPortable Amateur Radio</p>
            <p>+62 882 7125 9888</p>
            <p>support@dxportable.com</p>
          </div>

          <div>
            <div className='font-semibold mb-3'>Program</div>
            <p>DXPortable</p>
            <p>DXPMaps</p>
            <p>iQSL</p>
            <p>AOTA</p>
          </div>

          <div>
            <div className='font-semibold mb-3'>More</div>
            <p>FAQ</p>
            <p>Privacy Policy</p>
            <p>Terms & Condition</p>
          </div>

          <div>
            <div className='font-semibold mb-3'>Go Premium</div>
            <p className='opacity-90'>Unlock advanced features and full access.</p>
            <button className='mt-4 bg-white text-green-700 px-4 py-2 rounded-full'>Get a Premium</button>
          </div>
        </div>

        <p className='text-center text-xs mt-10 opacity-80'>©2026 DXPortable Amateur Radio. All Right Reserved</p>
      </footer>
    </main>
  );
}
