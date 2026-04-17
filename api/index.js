const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const scanRoutes = require('../backend/routes/scanRoutes');
const authRoutes = require('../backend/routes/authRoutes');

dotenv.config();

// Disable buffering so we discover connection errors immediately
mongoose.set('bufferCommands', false);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (Vercel will usually handle this via vercel.json, 
// but keeping it for local 'vercel dev' compatibility)
app.use(express.static('frontend'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', scanRoutes);

// MongoDB Connection Logic for Serverless
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = db.connections[0].readyState;
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('MongoDB Atlas connection error:', error);
    }
};

// Middleware to ensure DB connection before processing requests
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(503).json({ 
            error: "Database connection failed", 
            details: "Please verify MongoDB Atlas IP Whitelist allows Access from Anywhere (0.0.0.0/0)." 
        });
    }
});

module.exports = app;
