const mongoose = require('mongoose');

const agronomistSchema = new mongoose.Schema({
  names: { type: String, required: true },
  telephone: { type: String, required: true },
  district: { type: String, required: true },
  sector: { type: String, required: true },
  organizationEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  licensePath: { type: String, required: true },
  role: { type: String, default: 'agronomist' }
}, { timestamps: true });

module.exports = mongoose.model('Agronomist', agronomistSchema);