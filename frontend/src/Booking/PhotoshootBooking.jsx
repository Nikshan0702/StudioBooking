import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PhotoshootBooking = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slot, setSlot] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    name: "",
    email: "",
    phone: "",
    sessionType: "",
    packageType: "",
    date: "",
    time: "",
    specialRequests: "",
    address: "",
    status: "Pending",
    price: "",
    cameras: "1",
    additionalEquipment: false,
    makeupArtist: false,
    outfitChanges: "0",
    imageDeliveryFormat: "Digital",
    paymentMethod: "Credit Card"
  });

  const packageDetails = {
    "Basic": { price: "150", description: "1 hour session, 10 edited photos" },
    "Standard": { price: "300", description: "2 hour session, 25 edited photos" },
    "Premium": { price: "500", description: "4 hour session, 50+ edited photos" },
    "Custom": { price: "Contact for quote", description: "Tailored to your needs" }
  };

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    phone: "",
    sessionType: "",
    packageType: ""
  });

  // Calculate form completion percentage
  const calculateCompletion = () => {
    const requiredFields = ['name', 'email', 'phone', 'sessionType', 'packageType'];
    const completedFields = requiredFields.filter(field => booking[field].trim() !== '').length;
    return Math.round((completedFields / requiredFields.length) * 100);
  };

  useEffect(() => {
    const fetchSlot = async () => {
      try {
        const response = await axios.get(`/api/photoshoot-slots/${id}`);
        setSlot(response.data);
        setBooking(prev => ({
          ...prev,
          date: response.data.slotDate,
          time: `${response.data.start} to ${response.data.end}`
        }));
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to load slot details");
        setLoading(false);
      }
    };

    fetchSlot();
  }, [id]);

  useEffect(() => {
    if (booking.packageType) {
      setBooking(prev => ({
        ...prev,
        price: packageDetails[booking.packageType]?.price || ""
      }));
    }
  }, [booking.packageType]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBooking(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!booking.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!booking.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
      errors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!booking.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    }

    if (!booking.sessionType) {
      errors.sessionType = "Session type is required";
      isValid = false;
    }

    if (!booking.packageType) {
      errors.packageType = "Package type is required";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitLoading(true);
    try {
      await axios.post("/api/photoshoot-bookings", {
        ...booking,
        slotId: id,
        photographer: slot.photographer
      });
      navigate("/booking-confirmation", { state: { booking } });
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-700">Loading session details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Session</h3>
        <p className="text-gray-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  if (!slot) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Session Not Found</h3>
        <p className="text-gray-600">The requested photoshoot session could not be found.</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
        >
          Browse Available Sessions
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-700">Booking Progress: {calculateCompletion()}%</span>
            <span className="text-xs font-medium text-amber-600">{calculateCompletion() < 100 ? "Complete required fields" : "Ready to book!"}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${calculateCompletion()}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="pt-8 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              {/* Photographer Details */}
              <div className="md:w-2/5 p-6 bg-gradient-to-b from-amber-50 to-white border-b md:border-b-0 md:border-r border-gray-200">
                <div className="sticky top-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                      Session Summary
                    </span>
                  </h2>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center overflow-hidden border-2 border-amber-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-center text-gray-800">{slot.photographer}</h3>
                    <p className="text-sm text-amber-600 text-center">Professional Photographer</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm font-medium text-gray-700">Date & Time</p>
                      </div>
                      <p className="text-sm text-gray-600 ml-7">
                        {new Date(slot.slotDate).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                        <br />
                        {slot.start} - {slot.end}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-sm font-medium text-gray-700">Location</p>
                      </div>
                      <p className="text-sm text-gray-600 ml-7">123 Creative Lane, Art District</p>
                    </div>

                    {booking.packageType && (
                      <div className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
                        <div className="flex items-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-sm font-medium text-gray-700">Package</p>
                        </div>
                        <p className="text-sm font-semibold text-amber-600 ml-7">
                          {booking.packageType} - {booking.price.startsWith('$') ? booking.price : `$${booking.price}`}
                        </p>
                        <p className="text-xs text-gray-500 ml-7 mt-1">{packageDetails[booking.packageType]?.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="md:w-3/5 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                    Complete Your Booking
                  </span>
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information Section */}
                  <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">1</span>
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          className={`text-sm p-2.5 border ${validationErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                          name="name"
                          value={booking.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                        />
                        {validationErrors.name && <p className="text-xs text-red-500 mt-1">{validationErrors.name}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                          type="email"
                          className={`text-sm p-2.5 border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                          name="email"
                          value={booking.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                        />
                        {validationErrors.email && <p className="text-xs text-red-500 mt-1">{validationErrors.email}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Phone *</label>
                        <input
                          type="tel"
                          className={`text-sm p-2.5 border ${validationErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                          name="phone"
                          value={booking.phone}
                          onChange={handleChange}
                          placeholder="Your phone number"
                        />
                        {validationErrors.phone && <p className="text-xs text-red-500 mt-1">{validationErrors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Session Details Section */}
                  <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">2</span>
                      Session Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Session Type *</label>
                        <select
                          className={`text-sm p-2.5 border ${validationErrors.sessionType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                          name="sessionType"
                          value={booking.sessionType}
                          onChange={handleChange}
                        >
                          <option value="">Select type</option>
                          <option value="Studio">Studio Session</option>
                          <option value="Outdoor">Outdoor Session</option>
                          <option value="Portrait">Portrait Session</option>
                          <option value="Wedding">Wedding Photography</option>
                          <option value="Event">Special Event</option>
                        </select>
                        {validationErrors.sessionType && <p className="text-xs text-red-500 mt-1">{validationErrors.sessionType}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Package *</label>
                        <select
                          className={`text-sm p-2.5 border ${validationErrors.packageType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                          name="packageType"
                          value={booking.packageType}
                          onChange={handleChange}
                        >
                          <option value="">Select package</option>
                          <option value="Basic">Basic ($150)</option>
                          <option value="Standard">Standard ($300)</option>
                          <option value="Premium">Premium ($500)</option>
                          <option value="Custom">Custom (Quote)</option>
                        </select>
                        {validationErrors.packageType && <p className="text-xs text-red-500 mt-1">{validationErrors.packageType}</p>}
                      </div>

                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Number of Cameras</label>
                        <select
                          className="text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          name="cameras"
                          value={booking.cameras}
                          onChange={handleChange}
                        >
                          <option value="1">1 Camera</option>
                          <option value="2">2 Cameras (+$50)</option>
                          <option value="3">3+ Cameras (+$100)</option>
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Outfit Changes</label>
                        <select
                          className="text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          name="outfitChanges"
                          value={booking.outfitChanges}
                          onChange={handleChange}
                        >
                          <option value="0">No changes</option>
                          <option value="1">1 change (+$25)</option>
                          <option value="2">2 changes (+$40)</option>
                          <option value="3">3+ changes (+$60)</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Image Delivery Format</label>
                        <select
                          className="text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          name="imageDeliveryFormat"
                          value={booking.imageDeliveryFormat}
                          onChange={handleChange}
                        >
                          <option value="Digital">Digital Only</option>
                          <option value="Digital+Print">Digital + Prints</option>
                          <option value="Album">Photo Album (+$75)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Options Section */}
                  <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">3</span>
                      Additional Services
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="additionalEquipment"
                          name="additionalEquipment"
                          checked={booking.additionalEquipment}
                          onChange={handleChange}
                          className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                        />
                        <label htmlFor="additionalEquipment" className="ml-2 text-sm text-gray-700">
                          Additional Equipment (lighting, drones, etc.) (+$100)
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="makeupArtist"
                          name="makeupArtist"
                          checked={booking.makeupArtist}
                          onChange={handleChange}
                          className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                        />
                        <label htmlFor="makeupArtist" className="ml-2 text-sm text-gray-700">
                          Professional Makeup Artist (+$150)
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Location & Special Requests */}
                  <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">4</span>
                      Location & Special Requests
                    </h3>
                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Shooting Address</label>
                        <input
                          type="text"
                          className="text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          name="address"
                          value={booking.address}
                          onChange={handleChange}
                          placeholder="For outdoor/event sessions"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                        <textarea
                          className="text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          name="specialRequests"
                          value={booking.specialRequests}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Themes, specific shots, props, etc."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">5</span>
                      Payment Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                        <select
                          className="text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          name="paymentMethod"
                          value={booking.paymentMethod}
                          onChange={handleChange}
                        >
                          <option value="Credit Card">Credit Card</option>
                          <option value="PayPal">PayPal</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Cash">Cash (On Location)</option>
                        </select>
                      </div>

                      {booking.packageType && (
                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Estimated Total:</span>
                            <span className="text-lg font-bold text-amber-600">
                              {booking.price.startsWith('$') ? booking.price : `$${booking.price}`}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Final price may vary based on additional services</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="focus:ring-amber-500 h-4 w-4 text-amber-500 border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the <a href="#" className="text-amber-600 hover:text-amber-700">terms and conditions</a> and understand that a 25% deposit is required to secure my booking.
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
                    disabled={submitLoading}
                  >
                    {submitLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Secure Your Booking"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoshootBooking;