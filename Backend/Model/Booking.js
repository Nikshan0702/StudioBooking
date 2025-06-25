import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhotoshootSlot',
    required: true,
  },
  photographer: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please add your name'],
  },
  email: {
    type: String,
    required: [true, 'Please add your email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Please add your phone number'],
  },
  sessionType: {
    type: String,
    required: [true, 'Please select a session type'],
    enum: ['Studio', 'Outdoor', 'Portrait', 'Wedding', 'Event'],
  },
  packageType: {
    type: String,
    required: [true, 'Please select a package'],
    enum: ['Basic', 'Standard', 'Premium', 'Custom'],
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  specialRequests: {
    type: String,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    default: 'Pending',
  },
  price: {
    type: String,
    required: true,
  },
  cameras: {
    type: String,
    default: '1',
  },
  additionalEquipment: {
    type: Boolean,
    default: false,
  },
  makeupArtist: {
    type: Boolean,
    default: false,
  },
  outfitChanges: {
    type: String,
    default: '0',
  },
  imageDeliveryFormat: {
    type: String,
    enum: ['Digital', 'Digital+Print', 'Album'],
    default: 'Digital',
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'Bank Transfer', 'Cash'],
    default: 'Credit Card',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const BookingModel = mongoose.model('Booking', bookingSchema);

export default BookingModel;
