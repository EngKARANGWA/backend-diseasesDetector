const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  names: { type: String, required: true },
  telephone: { type: String, required: true },
  district: { type: String, required: true },
  sector: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);