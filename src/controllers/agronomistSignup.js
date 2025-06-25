const Agronomist = require('../models/agronomist');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

exports.signup = async (req, res) => {
  try {
    const { names, telephone, district, sector, organizationEmail, password, confirmPassword, licensePath } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    const existingAgronomist = await Agronomist.findOne({ organizationEmail });
    if (existingAgronomist) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const agronomist = new Agronomist({ names, telephone, district, sector, organizationEmail, password: hashedPassword, licensePath });
    await agronomist.save();
    const token = generateToken({ id: agronomist._id, role: 'agronomist' });
    res.status(201).json({ agronomist, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};