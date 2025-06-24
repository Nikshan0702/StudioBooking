import React from 'react';
import Header from '../assets/Header';
import banner from '../Images/banner.jpeg'

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
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-500">
                <img 
                  src={`/images/portfolio-${item}.jpg`} 
                  alt={`Portfolio ${item}`}
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-500 flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-full">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-medium py-2 px-8 rounded-full transition-all duration-300">
              View Full Services
            </button>
          </div>
        </div>
      </div>

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