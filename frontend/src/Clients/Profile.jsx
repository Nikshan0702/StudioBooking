import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEdit, FaBell, FaCalendarAlt, FaSignOutAlt, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Profile = () => {
    const [profile, setProfile] = useState({
        _id: '',
        name: '',
        email: '',
        mobile: '',
        address: ''
      });
      const [editMode, setEditMode] = useState(false);
      const [loading, setLoading] = useState({
        profile: false,
        update: false
      });
      const [error, setError] = useState('');
      const [successMessage, setSuccessMessage] = useState('');
      const [activeTab, setActiveTab] = useState('profile');
      const navigate = useNavigate();
      const fetchProfile = async () => {
        setLoading(prev => ({ ...prev, profile: true }));
        setError('');
        
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('Please login to view profile');
          navigate('/login');
          return;
        }
    
        try {
          const api = axios.create({
            baseURL: 'http://localhost:4000/UserOperations',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            withCredentials: true
          });
    
          const response = await api.get('/getUser');
          
          if (response.data?.success) {
            const userData = response.data.data;
            setProfile(userData);
            localStorage.setItem('userData', JSON.stringify(userData));
          }
        } catch (err) {
          console.error('Profile fetch error:', err);
          if (err.response?.status === 401) {
            handleLogout();
            setError('Session expired. Please login again.');
          } else {
            setError(err.response?.data?.message || 'Failed to load profile.');
          }
        } finally {
          setLoading(prev => ({ ...prev, profile: false }));
        }
      };
      const [bookings, setBookings] = useState([]);
const [bookingsLoading, setBookingsLoading] = useState(false);

const fetchBookings = async () => {
    setBookingsLoading(true);
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:4000/BookingOperations/bookings', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.data?.success) {
            setBookings(response.data.data);
        }
    } catch (err) {
        console.error('Failed to fetch bookings:', err);
        setError('Failed to load bookings');
    } finally {
        setBookingsLoading(false);
    }
};

useEffect(() => {
    if (activeTab === 'bookings') {
        fetchBookings();
    }
}, [activeTab]);
    
      useEffect(() => {
        fetchProfile();
      }, [navigate]);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(prev => ({ ...prev, update: true }));
        setError('');
        setSuccessMessage('');
    
        try {
          const token = localStorage.getItem('authToken');
          const api = axios.create({
            baseURL: 'http://localhost:4000/UserOperations',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            withCredentials: true
          });
    
          const response = await api.put(`/update/${profile._id}`, {
            name: profile.name,
            mobile: profile.mobile,
            gender: profile.gender
          });
    
          if (response.data.success) {
            setSuccessMessage('Profile updated successfully!');
            const updatedUser = response.data.data;
            setProfile(updatedUser);
            localStorage.setItem('userData', JSON.stringify(updatedUser));
            setEditMode(false);
          }
        } catch (err) {
          console.error('Update error:', err);
          if (err.response?.status === 401) {
            setError('Session expired. Please login again.');
            handleLogout();
          } else {
            setError(err.response?.data?.message || 'Update failed. Please try again.');
          }
        } finally {
          setLoading(prev => ({ ...prev, update: false }));
        }
      };


    
      const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        navigate('/login');
      };

    
      if (loading.profile && !profile.name) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md border border-amber-200">
                    <FaSpinner className="animate-spin text-4xl text-amber-600 mx-auto mb-4" />
                    <p className="text-lg text-gray-800 font-medium">Loading your profile...</p>
                    <p className="text-sm text-amber-700 mt-2">We're preparing your experience</p>
                </div>
            </div>
        );
    }

    if (error && !profile.name) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md border border-amber-200">
                    <p className="text-red-600 mb-6 font-medium text-lg">{error}</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-medium shadow-md"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar Navigation - Updated Color Scheme */}
                    <div className="w-full md:w-72 bg-white rounded-xl shadow-sm p-4 h-fit sticky top-4 border border-amber-200">
                        <div className="flex flex-col items-center py-6">
                            <div className="relative">
                                <FaUserCircle className="text-7xl text-amber-600 mb-3" />
                                <button 
                                    onClick={() => setEditMode(true)}
                                    className="absolute bottom-0 right-0 bg-amber-600 text-white p-2 rounded-full hover:bg-amber-700 transition shadow-md"
                                >
                                    <FaEdit size={14} />
                                </button>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mt-2">{profile.name}</h2>
                            <p className="text-gray-600 text-sm">{profile.email}</p>
                        </div>
                        
                        <nav className="mt-4 space-y-2">
                            <button 
                                className={`flex items-center w-full p-3 rounded-lg transition ${activeTab === 'profile' ? 'bg-amber-100 text-amber-800' : 'text-gray-600 hover:bg-amber-50'}`}
                                onClick={() => setActiveTab('profile')}
                            >
                                <FaUserCircle className="mr-3 text-lg text-amber-600" />
                                <span>My Profile</span>
                            </button>
                            
                            <button 
                                className={`flex items-center w-full p-3 rounded-lg transition ${activeTab === 'bookings' ? 'bg-amber-100 text-amber-800' : 'text-gray-600 hover:bg-amber-50'}`}
                                onClick={() => setActiveTab('bookings')}
                            >
                                <FaCalendarAlt className="mr-3 text-lg text-amber-600" />
                                <span>My Bookings</span>
                            </button>
                            
                            <button 
                                className={`flex items-center w-full p-3 rounded-lg transition ${activeTab === 'notifications' ? 'bg-amber-100 text-amber-800' : 'text-gray-600 hover:bg-amber-50'}`}
                                onClick={() => setActiveTab('notifications')}
                            >
                                <FaBell className="mr-3 text-lg text-amber-600" />
                                <span>Notifications</span>
                                <span className="ml-auto bg-amber-600 text-white text-xs px-2 py-1 rounded-full">3</span>
                            </button>
                            
                            <button 
                                className="flex items-center w-full p-3 rounded-lg text-gray-600 hover:bg-amber-50 transition mt-6"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt className="mr-3 text-lg text-amber-600" />
                                <span>Logout</span>
                            </button>
                        </nav>
                    </div>

                    {/* Main Content Area - Updated Color Scheme */}
                    <div className="flex-1">
                        {activeTab === 'profile' && (
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-amber-200">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                                    {!editMode ? (
                                        <button 
                                            onClick={() => setEditMode(true)}
                                            className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                                        >
                                            <FaEdit className="mr-2" />
                                            Edit Profile
                                        </button>
                                    ) : (
                                        <div className="flex space-x-2">
                                            <button 
                                                onClick={() => setEditMode(false)}
                                                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                                            >
                                                <FaTimes className="mr-2" />
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={handleSubmit}
                                                disabled={loading.update}
                                                className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition disabled:opacity-70"
                                            >
                                                {loading.update ? (
                                                    <>
                                                        <FaSpinner className="animate-spin mr-2" />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaCheck className="mr-2" />
                                                        Save Changes
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {error && (
                                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
                                        {error}
                                    </div>
                                )}

                                {successMessage && (
                                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-200">
                                        {successMessage}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 mb-1">Full Name</label>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={profile.name}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                                />
                                            ) : (
                                                <p className="p-3 bg-amber-50 text-gray-800 rounded-lg">{profile.name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-1">Email</label>
                                            <p className="p-3 bg-amber-50 text-gray-800 rounded-lg">{profile.email}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 mb-1">Mobile Number</label>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    name="mobile"
                                                    value={profile.mobile}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                                />
                                            ) : (
                                                <p className="p-3 bg-amber-50 text-gray-800 rounded-lg">{profile.mobile || 'Not provided'}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-1">Address</label>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={profile.address}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                                />
                                            ) : (
                                                <p className="p-3 bg-amber-50 text-gray-800 rounded-lg">{profile.address || 'Not provided'}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'bookings' && (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-amber-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>
        
        {bookingsLoading ? (
            <div className="flex justify-center py-8">
                <FaSpinner className="animate-spin text-2xl text-amber-600" />
            </div>
        ) : bookings.length > 0 ? (
            <div className="space-y-4">
                {bookings.map(booking => (
                    <div key={booking._id} className="p-4 border border-amber-200 rounded-lg hover:bg-amber-50 transition">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium text-lg text-gray-800">{booking.sessionType} Session</h3>
                                <p className="text-amber-600 font-medium">{booking.packageType} Package</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                                booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {booking.status}
                            </span>
                        </div>
                        
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <p className="text-sm text-gray-600">Date: {new Date(booking.date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-600">Time: {booking.time}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Price: {booking.price} LKR</p>
                                <p className="text-sm text-gray-600">Photographer: {booking.photographer}</p>
                            </div>
                        </div>
                        
                        {booking.specialRequests && (
                            <div className="mt-3">
                                <p className="text-sm font-medium text-gray-700">Special Requests:</p>
                                <p className="text-sm text-gray-600">{booking.specialRequests}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        ) : (
            <div className="bg-amber-50 p-8 rounded-xl text-center border border-amber-200">
                <FaCalendarAlt className="text-5xl text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No bookings yet</h3>
                <p className="text-gray-600 mb-4">You haven't made any bookings with our studio</p>
                <Link to="/PhotoshootBooking">
                    <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
                        Book a Session
                    </button>
                </Link>
            </div>
        )}
    </div>
)}

                        {activeTab === 'notifications' && (
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-amber-200">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
                                <div className="space-y-4">
                                    <div className="p-4 border border-amber-200 rounded-lg hover:bg-amber-50 transition">
                                        <div className="flex justify-between">
                                            <h3 className="font-medium">New studio session available</h3>
                                            <span className="text-xs text-amber-600">2 hours ago</span>
                                        </div>
                                        <p className="text-gray-600 mt-1">Weekend slots are now open for booking</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;