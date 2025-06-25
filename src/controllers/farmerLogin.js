const Farmer = require('../models/farmer');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const farmer = await Farmer.findOne({ email });
  if (!farmer) return res.status(400).json({ message: 'Invalid credentials' });
  const isMatch = await bcrypt.compare(password, farmer.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  const token = generateToken({ id: farmer._id, role: 'farmer' });
  res.json({ farmer, token });
};