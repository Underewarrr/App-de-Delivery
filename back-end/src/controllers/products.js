const productsService = require('../services/products');

async function findAllProducts(_req, res) {
    const { data, message, code } = await productsService.findAllProducts();
    if (!data) {
      return res.status(code).json({ message });
    }
    return res.status(code).json({ data });
}

module.exports = { findAllProducts };
