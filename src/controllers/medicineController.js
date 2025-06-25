const Medicine = require('../models/medicine');

exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().populate({
      path: 'supplierId',
      select: 'names telephone email'
    });
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMedicine = async (req, res) => {
  try {
    const supplierId = req.user.id; // get supplierId from authenticated user
    const { name, description, quantity, price } = req.body;
    const medicine = new Medicine({ name, description, quantity, price, supplierId });
    await medicine.save();
    res.status(201).json(medicine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};