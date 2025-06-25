import React from 'react';
import { Link } from 'react-router-dom';
import { FiCamera, FiCalendar, FiGift, FiStar, FiUser, FiHome } from 'react-icons/fi';

// Import your images
import ourstory from '../Images/p2.avif';
import p1 from '../Images/p1.avif';
import room from '../Images/room.jpg';
import m1 from '../Images/m1.jpg';
import b1 from '../Images/banner4.png'
import b2 from '../Images/banner2.jpg'
import Head from '../Clients/Head';

const Services = () => {
  // Sample promotions data that would come from your backend/API
  const promotions = [
    {
      id: 1,
      title: "Family Package",
      description: "Get 20% off on family portrait sessions booked this month",
      image: b1,
      cta: "Book Now",
      featured: true,
      validUntil: "2023-12-31"
    },
    {
      id: 2,
      title: "Family Package",
      description: "Get 20% off on family portrait sessions booked this month",
      image: b1,
      cta: "Book Now",
      featured: true,
      validUntil: "2023-12-31"
    },

  ];

  const featuredPromotions = promotions.filter(promo => promo.featured);
  const regularPromotions = promotions.filter(promo => !promo.featured);

  return (
    <div className="bg-gray-50 min-h-screen">
        <Head/>
      {/* Hero Banner */}
      <div className="relative h-screen max-h-[800px] overflow-hidden">
        <img 
          src={b2} 
          alt="Our photography studio team at work"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Premium Photography Services</h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-8">
              Capturing your most precious moments with artistry and passion
            </p>
            <Link 
              to="/bookings" 
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 inline-block"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </div>

      {/* Promotions Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold tracking-wider">CURRENT PROMOTIONS</span>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mt-2 mb-4">Special Offers</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
          </div>

          {/* Featured Promotions */}
          {featuredPromotions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {featuredPromotions.map(promo => (
                <div key={promo.id} className="relative rounded-xl overflow-hidden shadow-lg group">
                  <img 
                    src={promo.image} 
                    alt={promo.title}
                    className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8">
                    <div className="bg-amber-600 text-white text-sm font-medium py-1 px-3 rounded-full inline-block mb-3">
                      Limited Time
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{promo.title}</h3>
                    <p className="text-gray-200 mb-4">{promo.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-300 text-sm">Valid until {new Date(promo.validUntil).toLocaleDateString()}</span>
                      <button className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-lg transition-colors">
                        {promo.cta}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Regular Promotions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {regularPromotions.map(promo => (
              <div key={promo.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={promo.image} 
                    alt={promo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{promo.title}</h3>
                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded">
                      Promo
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{promo.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Expires {new Date(promo.validUntil).toLocaleDateString()}</span>
                    <button className="text-amber-600 hover:text-amber-700 font-medium">
                      {promo.cta} →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Admin action (would be conditionally rendered for admin users) */}
          <div className="text-center mt-12">
            <Link 
              to="/admin/promotions" 
              className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium"
            >
              <FiGift className="mr-2" />
              Manage Promotions (Admin)
            </Link>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold tracking-wider">PORTFOLIO</span>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mt-2 mb-4">Our Gallery</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
              Explore our collection of beautifully captured moments
            </p>
          </div>
      
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Wedding Photography */}
            <div className="group relative overflow-hidden rounded-lg aspect-square shadow-md">
              <img 
                src={p1}
                alt="Wedding photography by our studio"
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-500 flex items-center justify-center">
                <div className="text-center opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">Wedding Stories</h3>
                  <p className="text-gray-100 mb-4">Elegant moments captured forever</p>
                  <Link to='/gallery/wedding' className="border border-white text-white hover:bg-white/10 px-6 py-2 rounded-full text-sm tracking-wider inline-block">
                    VIEW GALLERY
                  </Link>
                </div>
              </div>
            </div>
      
            {/* Portrait Photography */}
            <div className="group relative overflow-hidden rounded-lg aspect-square shadow-md">
              <img 
                src={p1}
                alt="Portrait photography by our studio"
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-500 flex items-center justify-center">
                <div className="text-center opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">Portrait Art</h3>
                  <p className="text-gray-100 mb-4">Expressive character studies</p>
                  <Link to='/gallery/portrait' className="border border-white text-white hover:bg-white/10 px-6 py-2 rounded-full text-sm tracking-wider inline-block">
                    VIEW GALLERY
                  </Link>
                </div>
              </div>
            </div>
      
            {/* Commercial Photography */}
            <div className="group relative overflow-hidden rounded-lg aspect-square shadow-md">
              <img 
                src={p1}
                alt="Commercial photography by our studio"
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-500 flex items-center justify-center">
                <div className="text-center opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">Commercial Work</h3>
                  <p className="text-gray-100 mb-4">Brand imagery that sells</p>
                  <Link to='/gallery/commercial' className="border border-white text-white hover:bg-white/10 px-6 py-2 rounded-full text-sm tracking-wider inline-block">
                    VIEW GALLERY
                  </Link>
                </div>
              </div>
            </div>
          </div>
      
          <div className="text-center mt-12">
            <Link 
              to="/gallery" 
              className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-medium py-3 px-8 rounded-full transition-all duration-300 uppercase tracking-wider text-sm inline-flex items-center"
            >
              Explore Full Portfolio
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold tracking-wider">WHAT WE OFFER</span>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mt-2 mb-4">Our Services</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
              Comprehensive photography solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                name: "Wedding Photography", 
                desc: "Full wedding day coverage with professional editing",
                icon: <FiGift className="text-2xl text-amber-600" />
              },
              { 
                name: "Portrait Sessions", 
                desc: "Professional individual portraits in studio or on location",
                icon: <FiUser className="text-2xl text-amber-600" />
              },
              { 
                name: "Family Packages", 
                desc: "Beautiful group portraits for families of all sizes" ,
                icon: <FiHome className="text-2xl text-amber-600" />
              },
              { 
                name: "Commercial Shoots", 
                desc: "High-quality product and business photography",
                icon: <FiCamera className="text-2xl text-amber-600" />
              },
              { 
                name: "Event Coverage", 
                desc: "Professional documentation of corporate and social events",
                icon: <FiCalendar className="text-2xl text-amber-600" />
              },
              { 
                name: "Photo Restoration", 
                desc: "Digitally restore and enhance your old photographs",
                icon: <FiStar className="text-2xl text-amber-600" />
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-amber-200 transition-all group">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <Link 
                  to="/services" 
                  className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;