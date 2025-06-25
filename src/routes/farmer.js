const express = require('express');
const router = express.Router();
const farmerSignupController = require('../controllers/farmerSignup');
const farmerLoginController = require('../controllers/farmerLogin');
const auth = require('../middleware/auth');

// POST signup
router.post('/signup', farmerSignupController.signup);

// POST login
router.post('/login', farmerLoginController.login);

// Example protected route
router.get('/protected', auth, (req, res) => {
  res.json({ message: 'You are authenticated', user: req.user });
});

module.exports = router;