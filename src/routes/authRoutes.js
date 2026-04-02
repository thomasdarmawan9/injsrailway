const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// POST register
router.post('/register', authController.register);

// POST login
router.post('/login', authController.login);

// GET current user (protected)
// authMiddleware akan memverifikasi JWT sebelum masuk controller
router.get('/me', authMiddleware, authController.me);

module.exports = router;