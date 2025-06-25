const express = require('express');
const router = express.Router();
const Farmer = require('../models/farmer');
const farmerSignupController = require('../controllers/farmerSignup');
const farmerLoginController = require('../controllers/farmerLogin');
const auth = require('../middleware/auth');

// GET all farmers
router.get('/', async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST signup
router.post('/signup', farmerSignupController.signup);

// POST login
router.post('/login', farmerLoginController.login);

// Example protected route
router.get('/protected', auth, (req, res) => {
  res.json({ message: 'You are authenticated', user: req.user });
});

module.exports = router;