const express = require('express');
const router = express.Router();
const supplierSignupController = require('../controllers/supplierSignup');
const supplierLoginController = require('../controllers/supplierLogin');
const auth = require('../middleware/auth');
const Supplier = require('../models/supplier');

// POST signup
router.post('/signup', supplierSignupController.signup);

// POST login
router.post('/login', supplierLoginController.login);

// Protected route example
router.get('/protected', auth, (req, res) => {
  res.json({ message: 'You are authenticated', user: req.user });
});

// GET all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;