const express = require('express');
const createUser = require('../controllers/user.controllers');
const router = express.Router()

router.post('/createUser', createUser)

module.exports = router;