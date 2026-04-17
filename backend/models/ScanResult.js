const mongoose = require('mongoose');

const vulnerabilitySchema = new mongoose.Schema({
    type: { type: String, required: true },
    severity: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Detected' }
});

const scanResultSchema = new mongoose.Schema({
    url: { type: String, required: true },
    vulnerabilities: [vulnerabilitySchema],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ScanResult', scanResultSchema);
