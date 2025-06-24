import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpeg';

const Header = () => {
  return (
    <header className="fixed w-full bg-transparent text-white z-50 transition-all duration-300 hover:bg-white hover:bg-opacity-90 hover:text-gray-800 hover:shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            <img 
              src={logo}
              alt="Studio KFM Logo"
              className="h-12 w-12 rounded-full object-cover border-2 border-amber-400 shadow-md"
            />
            <span className="ml-3 text-2xl font-bold">
              <span className="text-amber-400">Studio</span>
              <span className="text-white mix-blend-difference">KFM</span>
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:block">
          <ul className="flex space-x-1">
            <li>
              <Link 
                to="/portfolio" 
                className="block px-5 py-3 font-medium hover:text-amber-400 rounded-lg transition-all duration-300"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className="block px-5 py-3 font-medium hover:text-amber-400 rounded-lg transition-all duration-300"
              >
                Services
              </Link>
            </li>
            <li>
              <Link 
                to="/pricing" 
                className="block px-5 py-3 font-medium hover:text-amber-400 rounded-lg transition-all duration-300"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="block px-5 py-3 font-medium hover:text-amber-400 rounded-lg transition-all duration-300"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* Call-to-Action Button */}
        <div className="flex items-center space-x-3">
          <Link 
            to="/contact" 
            className="hidden md:block px-5 py-3 font-medium hover:text-amber-400 transition-colors duration-300"
          >
            Contact
          </Link>
          <Link 
            to="/book" 
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;