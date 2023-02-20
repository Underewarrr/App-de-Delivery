const express = require('express');
const userController = require('../controllers/users');

const userRouter = express.Router();

userRouter.post('/login', userController.login);
userRouter.get('/sellers', userController.getSellers);

module.exports = userRouter;