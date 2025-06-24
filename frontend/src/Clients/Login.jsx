import React from 'react';
import banner3 from '../Images/banner3.jpg';
import Header from '../assets/Header';

const Login = () => {
  return (
    <div className="relative min-h-screen">
      {/* Transparent Header */}
      <Header />
      
      {/* Background with subtle overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${banner3})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Login Card - Centered with proper spacing */}
      <div className="relative  z-10 flex min-h-screen items-center justify-center px-4 pt-24 pb-10">
        <div className="w-full ml-96 max-w-md">
          <div className="bg-white/20 backdrop-blur-lg  rounded-xl shadow-2xl overflow-hidden border border-white/30">
            
            {/* Card Header with Gradient */}
            <div className="bg-gradient-to-r from-amber-400/40 via-amber-500/50 to-amber-600/40 py-5 px-6">
              <h2 className="text-3xl font-bold text-center text-white drop-shadow-lg">
                <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                  Studio
                </span>
                <span className="text-white">KFM</span>
              </h2>
              <p className="text-sm text-center text-amber-100 mt-1 tracking-wider font-medium">
                CLIENT PORTAL ACCESS
              </p>
            </div>
            
            {/* Login Form */}
            <form className="p-8">
              <div className="mb-5">
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white bg-white/15 border border-white/30 rounded-lg text-white placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all"
                  placeholder="nikshan@email.com"
                />
              </div>
              
              <div className="mb-1">
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-white border border-white/30 rounded-lg text-white placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
              
              <div className="flex justify-end mr-66 mb-6">
                <a href="#" className="text-xs text-amber-300 hover:text-amber-200 font-medium transition-colors">
                  Forgot password?
                </a>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Sign In
              </button>
            </form>
            
            {/* Card Footer */}
            <div className="px-8 pb-6 text-center">
              <p className="text-sm text-white/80">
                Don't have an account?{' '}
                <a href="/register" className="text-amber-300 hover:text-amber-200 font-semibold transition-colors">
                  Create Account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;