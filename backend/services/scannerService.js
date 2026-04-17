const axios = require('axios');

class ScannerService {
    async performScan(url) {
        const vulnerabilities = [];
        
        try {
            // Ensure URL starts with protocol
            if (!url.startsWith('http')) {
                url = 'http://' + url;
            }

            const response = await axios.get(url, { 
                timeout: 10000, 
                validateStatus: false,
                headers: { 'User-Agent': 'Mozilla/5.0 (VulnerabilityScanner/1.0)' }
            });
            const headers = response.headers;

            // 1. HTTPS Check
            if (!url.startsWith('https')) {
                vulnerabilities.push({
                    type: 'Insecure Protocol',
                    severity: 'Medium',
                    description: 'Website is using HTTP instead of HTTPS. Traffic is not encrypted.'
                });
            }

            // 2. Security Headers Check
            const requiredHeaders = [
                { name: 'content-security-policy', type: 'Missing CSP', severity: 'High', desc: 'Content-Security-Policy header is missing, increasing risk of XSS.' },
                { name: 'x-frame-options', type: 'Missing Clickjacking Protection', severity: 'Medium', desc: 'X-Frame-Options header is missing, making the site vulnerable to clickjacking.' },
                { name: 'strict-transport-security', type: 'Missing HSTS', severity: 'Medium', desc: 'Strict-Transport-Security header is missing.' },
                { name: 'x-content-type-options', type: 'Missing MIME Sniffing Protection', severity: 'Low', desc: 'X-Content-Type-Options: nosniff header is missing.' }
            ];

            requiredHeaders.forEach(header => {
                if (!headers[header.name]) {
                    vulnerabilities.push({
                        type: header.type,
                        severity: header.severity,
                        description: header.desc
                    });
                }
            });

            // 3. Open Endpoint Detection (Passive)
            const commonPaths = [
                { path: '/admin', type: 'Exposed Admin Panel', severity: 'High' },
                { path: '/.env', type: 'Exposed Configuration', severity: 'High' },
                { path: '/backup', type: 'Exposed Backup', severity: 'Medium' },
                { path: '/config', type: 'Exposed Config', severity: 'Medium' }
            ];

            const baseUrl = new URL(url).origin;
            for (const item of commonPaths) {
                try {
                    const checkRes = await axios.head(`${baseUrl}${item.path}`, { timeout: 3000, validateStatus: false });
                    if (checkRes.status === 200 || checkRes.status === 403) {
                         vulnerabilities.push({
                            type: item.type,
                            severity: item.severity,
                            description: `Potential sensitive path found: ${item.path} (Status: ${checkRes.status})`
                        });
                    }
                } catch (err) {
                    // Ignore errors for individual path checks
                }
            }

            // 4. Basic Injection Probe (Passive)
            try {
                const probeUrl = `${url}${url.includes('?') ? '&' : '?'}id=' OR 1=1 --`;
                const probeRes = await axios.get(probeUrl, { timeout: 5000, validateStatus: false });
                const body = probeRes.data.toString().toLowerCase();
                
                const sqlErrors = ['sql syntax', 'mysql_fetch', 'ora-0', 'sqlite3', 'postgresql error'];
                if (sqlErrors.some(err => body.includes(err))) {
                    vulnerabilities.push({
                        type: 'Potential SQL Injection',
                        severity: 'High',
                        description: 'Found SQL-related error messages in response to basic injection probe.'
                    });
                }
            } catch (err) {
                // Ignore probe errors
            }

            return vulnerabilities;

        } catch (error) {
            console.error('Scan Error:', error.message);
            throw new Error('Failed to reach the target URL. Please check if the URL is correct.');
        }
    }
}

module.exports = new ScannerService();
