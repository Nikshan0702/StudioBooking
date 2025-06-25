import React from 'react';
import { Link } from 'react-router-dom';
import { FiCamera, FiCalendar, FiGift, FiStar, FiUser, FiHome } from 'react-icons/fi';

// Import your images
import ourstory from '../Images/p2.avif'
import p1 from '../Images/p1.avif'
import room from '../Images/room.jpg'
import m1 from '../Images/m1.jpg'

const Services = () => {
  return (
    <div className="bg-gray-50">


     <div className="bg-white  py-12 shadow-sm">
      {/* Dashboard Quick Links */}
        {/* <div className="container ml-10 mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Link to="/bookings" className="dashboard-card">
              <FiCalendar className="text-2xl mb-2 text-amber-600" />
              <span>My Bookings</span>
            </Link>
            <Link to="/promotions" className="dashboard-card">
              <FiGift className="text-2xl mb-2 text-amber-600" />
              <span>Promotions</span>
            </Link>
            <Link to="/profile" className="dashboard-card">
              <FiUser className="text-2xl mb-2 text-amber-600" />
              <span>Profile</span>
            </Link>

          </div>
        </div> */}
      </div>


      {/* Hero Banner */}
      <div className="relative h-screen max-h-[800px] overflow-hidden">
        <img 
          src={ourstory} 
          alt="Our photography studio team at work"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Welcome Back</h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto">
              Continue your photography journey with us
            </p>
          </div>
        </div>
      </div>

    
   

      {/* Current Promotions */}
      <div className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-3">Special Offers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Limited-time deals for our valued clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-amber-500 text-white py-3 px-6">
                <h3 className="font-bold text-lg">Family Package</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">Get 20% off on family portrait sessions booked this month</p>
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg transition-colors">
                  Book Now
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-amber-500 text-white py-3 px-6">
                <h3 className="font-bold text-lg">Anniversary Special</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">Free anniversary photo shoot with any wedding package</p>
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg transition-colors">
                  Claim Offer
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-amber-500 text-white py-3 px-6">
                <h3 className="font-bold text-lg">Referral Bonus</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">Get $50 credit for every friend who books with us</p>
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg transition-colors">
                  Share Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
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
            <div className="group relative overflow-hidden rounded-lg aspect-square">
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
            <div className="group relative overflow-hidden rounded-lg aspect-square">
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
            <Link to="/gallery" className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-medium py-3 px-8 rounded-full transition-all duration-300 uppercase tracking-wider text-sm inline-block">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-3">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive photography solutions for every need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Wedding Photography", desc: "Full wedding day coverage"},
              { name: "Portrait Sessions", desc: "Professional individual portraits"},
              { name: "Family Packages", desc: "Group and family portraits" },
              { name: "Commercial Shoots", desc: "Product and business photography" },
              { name: "Event Coverage", desc: "Corporate and social events" },
              { name: "Photo Restoration", desc: "Bring old photos back to life"},
              { name: "Album Design", desc: "Custom photo book creation"},
              { name: "Drone Photography", desc: "Aerial views and landscapes"},
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl text-black font-bold mb-2">{service.name}</h3>
                <p className="text-black mb-4">{service.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-amber-600 font-medium">{service.price}</span>
                  <button className="text-amber-600 hover:text-amber-700 font-semibold">
                    Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      
    </div>
  );
};

export default Services;

// Add this to your CSS
// const styles = `
//   .dashboard-card {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 1.5rem 1rem;
//     background: white;
//     border-radius: 0.5rem;
//     box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//     transition: all 0.3s ease;
//     text-align: center;
//     color: #4b5563;
//     font-weight: 500;
//   }
//   .dashboard-card:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 4px 6px rgba(0,0,0,0.1);
//     color: #d97706;
//   }
// `;

// // Add styles to the head
// const styleSheet = document.createElement("style");
// styleSheet.type = "text/css";
// styleSheet.innerText = styles;
// document.head.appendChild(styleSheet);