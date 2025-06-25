const Farmer = require('../models/farmer');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

exports.signup = async (req, res) => {
  try {
    const { names, telephone, district, sector, cell, village, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    const existingFarmer = await Farmer.findOne({ email });
    if (existingFarmer) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const farmer = new Farmer({ names, telephone, district, sector, cell, village, email, password: hashedPassword });
    await farmer.save();
    const token = generateToken({ id: farmer._id, role: 'farmer' });
    res.status(201).json({ farmer, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
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