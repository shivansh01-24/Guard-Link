const ScanResult = require('../models/ScanResult');
const scannerService = require('../services/scannerService');

exports.startScan = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const vulnerabilities = await scannerService.performScan(url);
        
        const newScan = new ScanResult({
            url,
            vulnerabilities,
            userId: req.user.id
        });

        await newScan.save();
        res.status(201).json(newScan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const history = await ScanResult.find({ userId: req.user.id }).sort({ timestamp: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch scan history' });
    }
};
