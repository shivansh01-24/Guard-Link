const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const user = new User({ email, password });
        await user.save();
        
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'fallback_secret_key', { expiresIn: '1d' });
        res.status(201).json({ token, user: { email: user.email } });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'fallback_secret_key', { expiresIn: '1d' });
        res.json({ token, user: { email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};
