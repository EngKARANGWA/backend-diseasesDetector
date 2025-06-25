const express = require('express');
const router = express.Router();
const agronomistRegisterController = require('../controllers/agronomistRegister');
const multer = require('multer');

// Use local storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/register', upload.single('licenseFile'), agronomistRegisterController.registerAgronomist);
router.get('/', agronomistRegisterController.getAllAgronomists);

module.exports = router;