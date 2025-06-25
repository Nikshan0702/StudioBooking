import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../assets/Header';
import banner from '../Images/banner2.jpg';
import { useState } from 'react';
import axios from 'axios'; // Added missing axios import

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    password: '',
    cpassword: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (formData.password !== formData.cpassword) {
      setError("Passwords do not match!");
      setIsSubmitting(false);
      return;
    }
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/UserOperations/register', formData);
      alert("Your Profile Created!");
      navigate('/Login');
    } catch (error) {
      setError(error.response?.data?.message || "Error registering user!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Transparent Header */}
      <Header />

      {/* Background with overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      </div>

      {/* Registration Card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-24 pb-10">
        <div className="w-full max-w-2xl">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/20">
            
            {/* Card Header with Gradient */}
            <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 py-5 px-6">
              <h2 className="text-3xl font-bold text-center text-white drop-shadow-lg">
                <span className="bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                  Studio
                </span>
                <span className="text-white">KFM</span>
              </h2>
              <p className="text-sm text-center text-amber-100 mt-1 tracking-wider font-medium">
                CLIENT REGISTRATION
              </p>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="px-6 pt-4">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Client Name */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  />
                </div>
                
                {/* Email */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  />
                </div>
                
                {/* Mobile */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="+1 234 567 890"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  />
                </div>
                
                {/* Address */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Your address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  />
                </div>
                
                {/* Password */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  />
                </div>
                
                {/* Confirm Password */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    placeholder="Confirm password"
                    value={formData.cpassword}
                    onChange={handleChange}
                    required
                    minLength="6"
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Registering...' : 'Register Now'}
                </button>
              </div>
            </form>
            
            {/* Card Footer */}
            <div className="px-8 pb-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button 
                  onClick={() => navigate('/login')}
                  className="text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;