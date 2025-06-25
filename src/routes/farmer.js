const express = require('express');
const router = express.Router();
const farmerSignupController = require('../controllers/farmerSignup');

router.post('/signup', farmerSignupController.signup);
router.get('/farmers', farmerSignupController.getAllFarmers);

module.exports = router;