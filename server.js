const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const scanRoutes = require('./backend/routes/scanRoutes');
const authRoutes = require('./backend/routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vulnerability_scanner';

app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', scanRoutes);

// Serve static files from frontend as fallback
app.use(express.static('frontend'));

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
