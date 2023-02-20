const ordersService = require('../services/orders');

async function findAllCustomerOrders(req, res) {
    const userId = req.headers.authorization;
    const { data, message, code } = await ordersService.findAllCustomerOrders(userId);
    if (!data) {
      return res.status(code).json({ message });
    }
    return res.status(code).json({ data });
}

async function findAllSellerOrders(req, res) {
  const sellerId = req.headers.authorization;
  const { data, message, code } = await ordersService.findAllSellerOrders(sellerId);
  if (!data) {
    return res.status(code).json({ message });
  }
  return res.status(code).json({ data });
}

async function findDetails(req, res) {
  const { id } = req.params;
  const { data, message, code } = await ordersService.findOrderDetails(id);
    if (!data) {
      return res.status(code).json({ message });
    }
    return res.status(code).json({ data });
}

async function updateStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const { data, message, code } = await ordersService.updateStatus(status, id);
  if (!data) {
    return res.status(code).json({ message });
  }
  return res.status(code).json({ data });
}

module.exports = { findAllCustomerOrders, findAllSellerOrders, findDetails, updateStatus };
