const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyConfig = createProxyMiddleware({
    target: 'http://localhost:8547',
    changeOrigin: true,
    logLevel: 'debug'
});

module.exports = proxyConfig;
