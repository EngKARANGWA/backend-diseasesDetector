const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const auth = require('../middleware/auth');

// Only authenticated suppliers can add medicine
router.post('/', auth, medicineController.createMedicine);

// Anyone can view all medicines with supplier info
router.get('/', medicineController.getAllMedicines);

module.exports = router;