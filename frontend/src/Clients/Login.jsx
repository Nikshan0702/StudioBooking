import React, { useState } from 'react';
import banner3 from '../Images/banner3.jpg';
import Header from '../assets/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:4000/UserOperations/login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        if (response.data.user) {
          localStorage.setItem('userData', JSON.stringify(response.data.user));
        }
        if (response.data.user.type === 'admin') {
          navigate('/AdminBookings');
        } else {
          navigate('/Services');
        }
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid login credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      
      <div 
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${banner3})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-24 pb-10">
        <div className="w-full ml-96 max-w-md">
          <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/30">
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
            
            <form className="p-8" onSubmit={handleLogin}>
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div className="mb-5">
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white bg-white/15 border border-white/30 rounded-lg text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all"
                  placeholder="nikshan@email.com"
                  required
                />
              </div>
              
              <div className="mb-1">
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-white/30 rounded-lg text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="flex justify-end mr-66 mb-6">
                <a href="#" className="text-xs text-amber-300 hover:text-amber-200 font-medium transition-colors">
                  Forgot password?
                </a>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
            
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