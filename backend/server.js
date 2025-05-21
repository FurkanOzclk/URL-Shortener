const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Routes
app.use('/api/url', require('./routes/urlRoutes'));

// Test route
app.get('/', (req, res) => {
    res.send('URL Shortener API is running!');
});

app.get('/test', (req, res) => {
    res.send('Test sayfası çalışıyor!');
});

app.post('/test-post', (req, res) => {
    res.json({
        message: 'POST isteği başarılı!',
        body: req.body
    });
});

// URL kısaltma endpoint'i
app.post('/test-shorten', (req, res) => {
    const { originalUrl } = req.body;
    res.json({ 
        message: 'Test başarılı!',
        originalUrl: originalUrl,
        shortUrl: 'http://localhost:5000/abc123'
    });
});

// MongoDB Connection
connectDB();

// Start server
const PORT = 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
