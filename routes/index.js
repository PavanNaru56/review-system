const express = require('express');

const router = express.Router();

const UserController = require('../controllers/users_controller');

router.use('/',require('./users'));
router.use('/review',require('./reviews'));
module.exports = router;