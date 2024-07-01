const express = require('express');
const cors = require('cors');
const authenticateRequest = require('./middleware/authenticateRequest');
const proxyConfig = require('./config/proxyconfig');
const keyGen = require('./utils/keygen');

const app = express();
const PORT = 7771;
const keyGenSecret = "1121q7f6-3vcb-4d1b-a37c-0b655bc188f1"

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(authenticateRequest);

app.get(`/${keyGenSecret}`, (req, res) => {
    keyGen();
    res.send('Key generation initiated. Retreive key from server.');
});

app.use((req, res, next) => {
    if (req.path !== `/${keyGenSecret}`) {
        return proxyConfig(req, res, next);
    }
    next();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});