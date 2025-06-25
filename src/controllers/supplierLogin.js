const Supplier = require('../models/supplier');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const supplier = await Supplier.findOne({ email });
  if (!supplier) return res.status(400).json({ message: 'Invalid credentials' });
  const isMatch = await bcrypt.compare(password, supplier.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  const token = generateToken({ id: supplier._id, role: 'supplier' });
  res.json({ supplier, token });
};