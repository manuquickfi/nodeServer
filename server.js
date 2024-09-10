const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
require('dotenv').config();

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for all routes
app.use(cors());

// Proxy middleware
app.use('/api', createProxyMiddleware({
    target: process.env.AZURE_BACKEND_URL,
    changeOrigin: true,
}));
app.get('/health', (req, res) => {
    res.status(200).json({status: 'Server is running'});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
