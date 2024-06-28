const express = require('express');
const router = express.Router();
const { getAccountLoginByLastLogin } = require('../controllers/accountController');
const auth = require('../middlewares/auth')

router.get('/lastLogin', auth, getAccountLoginByLastLogin);

module.exports = router;