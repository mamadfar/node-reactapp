const express = require('express');
const router = express.Router();

// controller
const {registerProcess, showForm} = require('../http/controllers/auth/registerController');

// validator
const registerValidator = require('./../http/validators/registerValidator');

router.get("/register", showForm);

router.post("/register", registerValidator.handle(), registerProcess);

module.exports = router;