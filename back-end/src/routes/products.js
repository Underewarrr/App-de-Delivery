const express = require('express');
const productsController = require('../controllers/products');

const productsRouter = express.Router();

productsRouter.get('/products', productsController.findAllProducts);

module.exports = productsRouter;