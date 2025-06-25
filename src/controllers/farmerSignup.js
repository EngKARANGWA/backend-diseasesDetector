const Farmer = require('../models/farmer');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  try {
    const { names, telephone, district, sector, cell, village, email, password } = req.body;

    // Check if email already exists
    const existing = await Farmer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const farmer = new Farmer({
      names,
      telephone,
      district,
      sector,
      cell,
      village,
      email,
      password: hashedPassword
    });

    await farmer.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.status(200).json(farmers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};