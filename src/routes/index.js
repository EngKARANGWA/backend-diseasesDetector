const express = require('express');
const IndexController = require('../controllers/index');

const router = express.Router();
const indexController = new IndexController();

router.post('/users', indexController.createUser.bind(indexController));
router.get('/users/:id', indexController.getUser.bind(indexController));

module.exports = router;