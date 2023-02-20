const express = require('express');
const registerController = require('../controllers/registerController');

const registerRouter = express.Router();

registerRouter.post('/register', registerController.register);

module.exports = registerRouter;