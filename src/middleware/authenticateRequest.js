const fs = require('fs');
const path = require('path');

const authenticateRequest = (req, res, next) => {
    const keysPath = path.join(__dirname, '../config/keys.json');
    const ipsPath = path.join(__dirname, '../config/ips.json');

    fs.readFile(keysPath, (err, keyData) => {
        if (err) {
            console.error('Error reading keys.json:', err);
            return res.status(500).json({ error: 'Internal server error while reading keys.json' });
        }
        
        fs.readFile(ipsPath, (err, ipData) => {
            if (err) {
                console.error('Error reading ips.json:', err);
                return res.status(500).json({ error: 'Internal server error while reading ips.json' });
            }

            const keys = JSON.parse(keyData);
            const ips = JSON.parse(ipData);
            var userIP = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
            const userKey = req.query.key;

            if (ips.includes(userIP) || keys.includes(userKey)) {
                next();
            } else {
				console.log(`Access Denied from ${userIP}`);
                res.status(403).json({ error: 'Access Denied', ip: userIP });
            }
        });
    });
};

module.exports = authenticateRequest;