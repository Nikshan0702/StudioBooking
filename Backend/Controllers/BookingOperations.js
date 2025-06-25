import express from "express";
import PhotoshootSlot from "../Model/PhotoshootSlot.js";
import Booking from "../Model/Booking.js";
import mongoose from "mongoose";

const router = express.Router();

// CORS Middleware (same as your example)
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    next();
});

// Authentication Middleware 
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication token required' 
      });
    }
  
    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
};

// Admin Middleware
const isAdmin = (req, res, next) => {
    
    next();
};

// PHOTOSHOOT SLOTS ROUTES

// Get all available slots
router.get('/slots', async (req, res) => {
    const { date } = req.query;
    
    let query = { isBooked: false };
    
    if (date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        
        query.slotDate = {
            $gte: startOfDay,
            $lte: endOfDay
        };
    }
    
    try {
        const slots = await PhotoshootSlot.find(query).sort({ slotDate: 1, start: 1 });
        res.json({
            success: true,
            data: slots
        });
    } catch (err) {
        console.error('Error fetching slots:', err);
        res.status(500).json({
            success: false,
            message: "Error fetching available slots",
            error: err.message
        });
    }
});

// Get single slot by ID
router.get('/slots/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid slot ID format"
            });
        }
        
        const slot = await PhotoshootSlot.findById(req.params.id);
        
        if (!slot) {
            return res.status(404).json({
                success: false,
                message: "Slot not found"
            });
        }
        
        res.json({
            success: true,
            data: slot
        });
    } catch (err) {
        console.error('Error fetching slot:', err);
        res.status(500).json({
            success: false,
            message: "Error fetching slot details",
            error: err.message
        });
    }
});

// Create a new slot (Admin only)
router.post('/slots', authenticateUser, isAdmin, async (req, res) => {
    const { photographer, slotDate, start, end } = req.body;
    
    try {
        const slot = new PhotoshootSlot({
            photographer,
            slotDate,
            start,
            end
        });
        
        const createdSlot = await slot.save();
        res.status(201).json({
            success: true,
            message: "Slot created successfully",
            data: createdSlot
        });
    } catch (err) {
        console.error('Error creating slot:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                error: err.message
            });
        }
        res.status(500).json({
            success: false,
            message: "Error creating slot",
            error: err.message
        });
    }
});

// Book a slot
router.put('/slots/:id/book', authenticateUser, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid slot ID format"
            });
        }
        
        const slot = await PhotoshootSlot.findById(req.params.id);
        
        if (!slot) {
            return res.status(404).json({
                success: false,
                message: "Slot not found"
            });
        }
        
        if (slot.isBooked) {
            return res.status(400).json({
                success: false,
                message: "Slot is already booked"
            });
        }
        
        slot.isBooked = true;
        await slot.save();
        
        res.json({
            success: true,
            message: "Slot booked successfully"
        });
    } catch (err) {
        console.error('Error booking slot:', err);
        res.status(500).json({
            success: false,
            message: "Error booking slot",
            error: err.message
        });
    }
});

// BOOKING ROUTES

// Create new booking
router.post('/bookings', async (req, res) => {
    const {
        slotId,
        photographer,
        name,
        email,
        phone,
        sessionType,
        packageType,
        date,
        time,
        specialRequests,
        address,
        price,
        cameras,
        additionalEquipment,
        makeupArtist,
        outfitChanges,
        imageDeliveryFormat,
        paymentMethod
    } = req.body;

    try {
        // Validate slot ID
        if (!mongoose.Types.ObjectId.isValid(slotId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid slot ID format"
            });
        }

        // Validate and parse date
        let bookingDate;
        try {
            bookingDate = new Date(date);
            if (isNaN(bookingDate.getTime())) {
                throw new Error('Invalid date format');
            }
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Please use YYYY-MM-DD format"
            });
        }

        // Check if slot exists and is available
        const slot = await PhotoshootSlot.findById(slotId);
        
        if (!slot) {
            return res.status(404).json({
                success: false,
                message: "Slot not found"
            });
        }
        
        if (slot.isBooked) {
            return res.status(400).json({
                success: false,
                message: "Slot is already booked"
            });
        }

        // Create new booking with properly formatted date
        const booking = new Booking({
            slotId,
            photographer,
            name,
            email,
            phone,
            sessionType,
            packageType,
            date: bookingDate,  // Use the Date object
            time,
            specialRequests,
            address,
            status: 'Pending',
            price: Number(price),
            cameras,
            additionalEquipment,
            makeupArtist,
            outfitChanges,
            imageDeliveryFormat,
            paymentMethod
        });

        // Mark slot as booked
        slot.isBooked = true;
        await slot.save();

        const createdBooking = await booking.save();
        
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: createdBooking
        });
    } catch (err) {
        console.error('Error creating booking:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                error: err.message
            });
        }
        res.status(500).json({
            success: false,
            message: "Error creating booking",
            error: err.message
        });
    }
});

// Get all bookings (Admin only)
router.get('/bookings', authenticateUser, isAdmin, async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('slotId', 'slotDate start end');
        res.json({
            success: true,
            data: bookings
        });
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({
            success: false,
            message: "Error fetching bookings",
            error: err.message
        });
    }
});

// Get booking by ID
router.get('/bookings/:id', authenticateUser, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid booking ID format"
            });
        }
        
        const booking = await Booking.findById(req.params.id).populate('slotId', 'slotDate start end');
        
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }
        
        res.json({
            success: true,
            data: booking
        });
    } catch (err) {
        console.error('Error fetching booking:', err);
        res.status(500).json({
            success: false,
            message: "Error fetching booking details",
            error: err.message
        });
    }
});

// Update booking status (Admin only)
router.put('/bookings/:id/status', authenticateUser, isAdmin, async (req, res) => {
    const { status } = req.body;
    
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid booking ID format"
            });
        }
        
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }
        
        booking.status = status;
        const updatedBooking = await booking.save();
        
        res.json({
            success: true,
            message: "Booking status updated successfully",
            data: updatedBooking
        });
    } catch (err) {
        console.error('Error updating booking status:', err);
        res.status(500).json({
            success: false,
            message: "Error updating booking status",
            error: err.message
        });
    }
});

export default router;