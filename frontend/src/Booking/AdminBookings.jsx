import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const fetchBookings = async () => {
        setLoading(true);
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
            setLoading(false);
        }
    };

    const updateBookingStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.patch(`http://localhost:4000/BookingOperations/bookings/${id}/status`, 
                { status },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            fetchBookings(); // Refresh the list
        } catch (err) {
            console.error('Failed to update booking:', err);
            setError('Failed to update booking status');
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            booking.sessionType.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 p-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-amber-200">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Bookings</h1>
                
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search bookings..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    <select
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center py-12">
                        <FaSpinner className="animate-spin text-3xl text-amber-600" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredBookings.map(booking => (
                                    <tr key={booking._id} className="hover:bg-amber-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                                            <div className="text-sm text-gray-500">{booking.email}</div>
                                            <div className="text-sm text-gray-500">{booking.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{booking.sessionType}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Date(booking.date).toLocaleDateString()}
                                            </div>
                                            <div className="text-sm text-gray-500">{booking.time}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {booking.packageType}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {booking.price} LKR
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                                booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {booking.status === 'Pending' && (
                                                <>
                                                    <button 
                                                        onClick={() => updateBookingStatus(booking._id, 'Confirmed')}
                                                        className="text-green-600 hover:text-green-900 mr-3"
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                    <button 
                                                        onClick={() => updateBookingStatus(booking._id, 'Cancelled')}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </>
                                            )}
                                            {booking.status === 'Confirmed' && (
                                                <button 
                                                    onClick={() => updateBookingStatus(booking._id, 'Completed')}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Mark Complete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBookings;