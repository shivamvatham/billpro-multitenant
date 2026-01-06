const express = require('express');
const authRoutes = require('./auth.routes');

const router = express.Router();

router.get('/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is working! Multi-tenant billing system ready.'
  });
});

router.use('/auth', authRoutes);

module.exports = router;