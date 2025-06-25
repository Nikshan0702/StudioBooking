import mongoose from "mongoose";

const photoshootSlotSchema = new mongoose.Schema({
  photographer: {
    type: String,
    required: [true, 'Please add a photographer name'],
  },
  slotDate: {
    type: Date,
    required: [true, 'Please add a date for the slot'],
  },
  start: {
    type: String,
    required: [true, 'Please add a start time'],
  },
  end: {
    type: String,
    required: [true, 'Please add an end time'],
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PhotoshootSlotModel = mongoose.model('PhotoshootSlot', photoshootSlotSchema);

export default PhotoshootSlotModel;
