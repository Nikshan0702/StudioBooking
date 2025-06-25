import React from 'react'
import ourstory from './About/p2.avif'
import p1 from './About/p1.avif'
import room from './About/room.jpg'
import m1 from './About/m1.jpg'
import Header from '../assets/Header';

const About = () => {
  return (
    <div>
        <div className="bg-white">
        <Header />
  {/* Hero Section */}
  <div className="relative h-screen max-h-[800px] overflow-hidden">
    <img 
      src={ourstory} 
      alt="Our photography studio team at work"
      className="w-full h-full object-cover absolute inset-0"
    />
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Our Story</h1>
        <p className="text-xl text-gray-100 max-w-2xl mx-auto">
          Capturing life's precious moments since 2010
        </p>
      </div>
    </div>
  </div>

  {/* Studio Story */}
  <div className="py-20 px-4 max-w-6xl mx-auto">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">The Studio Behind the Lens</h2>
        <div className="space-y-4 text-gray-600">
          <p>
            Founded in a small downtown loft, our studio has grown into one of the most sought-after 
            photography teams in the region. What began as a passion project between two art school 
            graduates has blossomed into a full-service studio specializing in wedding, portrait, 
            and commercial photography.
          </p>
          <p>
            We believe photography is more than just taking pictures—it's about preserving emotions, 
            telling stories, and creating heirlooms that will be cherished for generations.
          </p>
          <p>
            Every client receives our undivided attention, from the initial consultation to the 
            final delivery of your gallery. We pour our artistic vision and technical expertise 
            into every frame we capture.
          </p>
        </div>
      </div>
      <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-xl">
        <img 
          src={room}
          alt="Our modern photography studio space"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>

  {/* Team Section */}
  <div className="bg-gray-50 py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-16">Meet The Artists</h2>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Team Member 1 */}
        <div className="group text-center">
          <div className="relative aspect-square rounded-full overflow-hidden mb-6 w-64 h-64 mx-auto">
            <img 
              src={m1} 
              alt="Emma Rodriguez - Client Manager"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">V1</h3>
          <p className="text-amber-600 font-medium mb-4">CEO</p>
          <p className="text-gray-600 px-4">
            Emma ensures every client's experience is seamless, from booking to final delivery.
          </p>
        </div>

        {/* Team Member 2 */}
        <div className="group text-center">
          <div className="relative aspect-square rounded-full overflow-hidden mb-6 w-64 h-64 mx-auto">
            <img 
              src={m1} 
              alt="Emma Rodriguez - Client Manager"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">V1</h3>
          <p className="text-amber-600 font-medium mb-4">CEO</p>
          <p className="text-gray-600 px-4">
            Emma ensures every client's experience is seamless, from booking to final delivery.
          </p>
        </div>

        {/* Team Member 3 */}
        <div className="group text-center">
          <div className="relative aspect-square rounded-full overflow-hidden mb-6 w-64 h-64 mx-auto">
            <img 
              src={m1} 
              alt="Emma Rodriguez - Client Manager"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">V1</h3>
          <p className="text-amber-600 font-medium mb-4">CEO</p>
          <p className="text-gray-600 px-4">
            Emma ensures every client's experience is seamless, from booking to final delivery.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Philosophy Section */}
  <div className="py-20 px-4 max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Our Philosophy</h2>
    <div className="relative inline-block mb-12">
      <img 
        src={p1}
        alt=""
        className="w-24 h-24 object-contain"
      />
    </div>
    <p className="text-xl text-gray-600 mb-8 italic">
      "We don't just take photographs—we craft visual legacies. Every click of our shutter 
      is an opportunity to freeze time, preserve emotion, and create art that speaks across 
      generations."
    </p>
    <button className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-medium py-3 px-8 rounded-full transition-all duration-300 uppercase tracking-wider text-sm">
      Book a Consultation
    </button>
  </div>

  {/* Studio Features */}
  <div className="bg-gray-900 text-white py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-center mb-16">Why Choose Us</h2>
      <div className="grid md:grid-cols-3 gap-10">
        <div className="text-center">
          <div className="text-5xl font-serif font-bold text-amber-500 mb-4">10K+</div>
          <h3 className="text-xl font-bold mb-2">Moments Captured</h3>
          <p className="text-gray-300">
            Over a decade of preserving precious memories for families and brands
          </p>
        </div>
        <div className="text-center">
          <div className="text-5xl font-serif font-bold text-amber-500 mb-4">100%</div>
          <h3 className="text-xl font-bold mb-2">Client Satisfaction</h3>
          <p className="text-gray-300">
            Every project receives our full commitment to excellence
          </p>
        </div>
        <div className="text-center">
          <div className="text-5xl font-serif font-bold text-amber-500 mb-4">5</div>
          <h3 className="text-xl font-bold mb-2">Industry Awards</h3>
          <p className="text-gray-300">
            Recognized for artistic excellence and technical innovation
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default About