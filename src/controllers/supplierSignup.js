const Supplier = require('../models/supplier');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

exports.signup = async (req, res) => {
  try {
    const { names, telephone, district, sector, companyName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingSupplier = await Supplier.findOne({ email });
    if (existingSupplier) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const supplier = new Supplier({ names, telephone, district, sector, companyName, email, password: hashedPassword });
    await supplier.save();
    const token = generateToken({ id: supplier._id, role: 'supplier' });
    res.status(201).json({ supplier, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};