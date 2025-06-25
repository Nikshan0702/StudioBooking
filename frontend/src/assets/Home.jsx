import React from 'react';
import Header from '../assets/Header';
import banner from '../Images/banner.jpeg'
import i1 from '../Images/banner1.jpeg'
import i2 from '../Images/banner2.jpg'
import i3 from '../Images/login.jpg'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
     
          <Header />
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <img 
          src={banner}
          alt="Photography Studio" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Capturing <span className="text-amber-400">Moments</span> That Last
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Professional photography services for weddings, portraits, and commercial projects
            </p>
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Book a Session
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Showcase */}
      <div className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-serif font-bold text-gray-900 mb-3">Our Gallery</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Capturing moments that tell your unique story
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Wedding Photography */}
      <div className="group relative overflow-hidden rounded-lg aspect-square">
        <img 
          src={i1}
          alt="Wedding photography by our studio"
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-500 flex items-center justify-center">
          <div className="text-center opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
            <h3 className="text-2xl font-serif font-bold text-white mb-2">Wedding Stories</h3>
            <p className="text-gray-100 mb-4">Elegant moments captured forever</p>
            <Link to='/login'> <button className="border border-white text-white hover:bg-white/10 px-6 py-2 rounded-full text-sm tracking-wider">
              VIEW GALLERY
            </button></Link>
          </div>
        </div>
      </div>

      {/* Portrait Photography */}
      <div className="group relative overflow-hidden rounded-lg aspect-square">
        <img 
          src={i2}
          alt="Portrait photography by our studio"
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-500 flex items-center justify-center">
          <div className="text-center opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
            <h3 className="text-2xl font-serif font-bold text-white mb-2">Portrait Art</h3>
            <p className="text-gray-100 mb-4">Expressive character studies</p>
            <Link to='/login'> <button className="border border-white text-white hover:bg-white/10 px-6 py-2 rounded-full text-sm tracking-wider">
              VIEW GALLERY
            </button></Link>
          </div>
        </div>
      </div>

      {/* Commercial Photography */}
      <div className="group relative overflow-hidden rounded-lg aspect-square">
        <img 
          src={i3}
          alt="Commercial photography by our studio"
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-500 flex items-center justify-center">
          <div className="text-center opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
            <h3 className="text-2xl font-serif font-bold text-white mb-2">Commercial Work</h3>
            <p className="text-gray-100 mb-4">Brand imagery that sells</p>
           <Link to='/login'> <button className="border border-white text-white hover:bg-white/10 px-6 py-2 rounded-full text-sm tracking-wider">
              VIEW GALLERY
            </button></Link>
          </div>
        </div>
      </div>

      {/* Add more photography categories as needed */}
    </div>

    <div className="text-center mt-12">
      <button className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-medium py-3 px-8 rounded-full transition-all duration-300 uppercase tracking-wider text-sm">
        View Full Portfolio
      </button>
    </div>
  </div>
</div>
      {/* <div className="py-20 bg-gray-50">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Creative Work</h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Explore our collection of premium projects crafted with passion and expertise.
      </p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div 
          key={item} 
          className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
        >
          <div className="aspect-w-4 aspect-h-3 overflow-hidden">
            <img 
              src={`/images/banner-${item}.jpeg`} 
              alt={`Project ${item}`}
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 className="text-2xl font-semibold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Project Title {item}
            </h3>
            <p className="text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              Brief description of the project and its key features.
            </p>
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-5 rounded-lg transition-colors duration-200">
                View Case Study
              </button>
              <button className="border border-white text-white hover:bg-white/10 font-medium py-2 px-5 rounded-lg transition-colors duration-200">
                Live Demo
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    <div className="text-center mt-16">
      <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-200 md:py-4 md:text-lg md:px-10">
        View All Projects
        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</div> */}

      {/* Services Section */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Portrait Photography",
                desc: "Professional individual and family portraits in studio or on location",
                icon: "📷"
              },
              {
                title: "Wedding Photography",
                desc: "Beautiful documentation of your special day with artistic flair",
                icon: "💍"
              },
              {
                title: "Commercial Photography",
                desc: "High-quality product and business photography for brands",
                icon: "🏢"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Client Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                quote: "The photos from our wedding are absolutely stunning! They captured every special moment perfectly.",
                author: "Sarah & Michael J."
              },
              {
                quote: "Professional, creative, and wonderful to work with. Our family portraits are beautiful!",
                author: "The Williams Family"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <p className="font-medium text-gray-800">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Something Beautiful?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to schedule your photography session
          </p>
          <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 mr-4">
            Book Now
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-gray-800 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;