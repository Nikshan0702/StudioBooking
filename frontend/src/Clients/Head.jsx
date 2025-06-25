import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiBell } from 'react-icons/fi';
import logo from '../images/logo.jpeg';

const Head = () => {
  // Mock notification count - would come from your state/API
  const notificationCount = 3;

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
                to="/Services" 
                className="block px-5 py-3 font-medium hover:text-amber-400 rounded-lg transition-all duration-300"
              >
                Home
              </Link>
            </li>

          </ul>
        </nav>

        {/* Right-side icons and buttons */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon with Badge */}
          <div className="relative">
            <Link 
              to="/notifications" 
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-300 flex items-center justify-center"
            >
              <FiBell className="text-xl" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Link>
          </div>

          {/* Profile Icon/Dropdown */}
          <div className="relative group">
            <Link 
              to="/profile" 
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-300 flex items-center justify-center"
            >
              <FiUser className="text-xl" />
            </Link>
            
            {/* Profile Dropdown (would appear on hover) */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
              <Link 
                to="/profile" 
                className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-600"
              >
                My Profile
              </Link>
              <Link 
                to="/bookings" 
                className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-600"
              >
                My Bookings
              </Link>
              <Link 
                to="/settings" 
                className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-600"
              >
                Settings
              </Link>
              <div className="border-t border-gray-200 my-1"></div>
              <Link 
                to="/logout" 
                className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-600"
              >
                Logout
              </Link>
            </div>
          </div>

          {/* Contact Button - Only shown on larger screens */}
          <Link 
            to="/contact" 
            className="hidden md:block px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Head;