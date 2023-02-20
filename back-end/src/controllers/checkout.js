const checkoutService = require('../services/checkout');

async function create(req, res) {
  const userId = req.headers.authorization;
  const { message, code, data } = await checkoutService.createSale(req.body, userId);
  if (message) {
    return res.status(code).json({ message });
  }
  return res.status(code).json({ data });
}

module.exports = { create };
