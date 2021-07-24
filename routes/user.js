const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/store', userController.validate('createUser'), userController.store);
router.post('/authenticate', userController.validate('authenticate'), userController.authenticate);

module.exports = router;
