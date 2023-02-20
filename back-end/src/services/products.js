const { Product } = require('../database/models');

async function findAllProducts() {
  const data = await Product.findAll();

  if (!data) {
    return { code: 500, message: 'Erro interno!' };
  }

  return { code: 200, data };
}

module.exports = { findAllProducts };
