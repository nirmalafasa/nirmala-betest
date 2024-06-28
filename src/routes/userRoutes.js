const express = require('express');
const router = express.Router();
const { getUserByAccountNumber, getUserByRegistrationNumber } = require('../controllers/userController');
const auth = require('../middlewares/auth')

router.get('/accountNumber/:accountNumber', auth, getUserByAccountNumber);
router.get('/registrationNumber/:registrationNumber', auth, getUserByRegistrationNumber);

module.exports = router;