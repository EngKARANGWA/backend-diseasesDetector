const Agronomist = require('../models/agronomist');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

exports.login = async (req, res) => {
  const { organizationEmail, password } = req.body;
  const agronomist = await Agronomist.findOne({ organizationEmail });
  if (!agronomist) return res.status(400).json({ message: 'Invalid credentials' });
  const isMatch = await bcrypt.compare(password, agronomist.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  const token = generateToken({ id: agronomist._id, role: 'agronomist' });
  res.json({ agronomist, token });
};