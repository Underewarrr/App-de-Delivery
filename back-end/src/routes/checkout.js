const express = require('express');
const checkoutController = require('../controllers/checkout');

const userRouter = express.Router();

userRouter.post('/checkout', checkoutController.create);

module.exports = userRouter;