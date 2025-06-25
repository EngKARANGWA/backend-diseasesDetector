const Agronomist = require('../models/agronomist');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

exports.registerAgronomist = async (req, res) => {
  try {
    const { names, telephone, district, sector, organizationEmail, password } = req.body;
    const licenseFile = req.file;

    if (!licenseFile) {
      return res.status(400).json({ message: 'License/certificate file is required.' });
    }

    // Check if email already exists
    const existing = await Agronomist.findOne({ organizationEmail });
    if (existing) {
      return res.status(400).json({ message: 'An agronomist with this email already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const agronomist = new Agronomist({
      names,
      telephone,
      district,
      sector,
      organizationEmail,
      licensePath: licenseFile.path, // Local file path
      password: hashedPassword,
      role: 'agronomist'
    });

    await agronomist.save();

    res.status(201).json({ message: 'Registration successful!', licenseUrl: licenseFile.path });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllAgronomists = async (req, res) => {
  try {
    const agronomists = await Agronomist.find();
    res.status(200).json(agronomists);
  } catch (err) {
    res.status(500).send();
  }
};