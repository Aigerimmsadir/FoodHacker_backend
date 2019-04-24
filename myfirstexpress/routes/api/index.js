
const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/answers',require('./answers'))
router.use('/foods',require('./foods'))
module.exports = router;