const express = require('express');
const ordersController = require('../controllers/orders');

const orderRouter = express.Router();

orderRouter.get('/orders/customer', ordersController.findAllCustomerOrders);
orderRouter.get('/orders/seller', ordersController.findAllSellerOrders);
orderRouter.get('/orders/:id', ordersController.findDetails);
orderRouter.patch('/orders/:id', ordersController.updateStatus);

module.exports = orderRouter;