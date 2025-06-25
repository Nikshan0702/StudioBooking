import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import UserOperations from './Controllers/UserOperations.js';
import BookingOperation from './Controllers/BookingOperations.js'


dotenv.config();
const app = express();

app.use('/uploads', express.static('public/uploads'));




app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());
app.use(express.json()); 


app.use("/UserOperations", UserOperations);
app.use("/BookingOperations", BookingOperation);




mongoose.connect(process.env.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB connection error:", err));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
