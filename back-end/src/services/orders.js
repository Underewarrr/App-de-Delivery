const { Sale, salesProduct, Product, User } = require('../database/models');

async function findAllCustomerOrders(userId) {
  try {
    const data = await Sale.findAll({
      where: { userId },
      attributes: { exclude: ['userId', 'sellerId'] },
      include: [
        { model: User, as: 'seller', attributes: { exclude: ['password'] } },
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
      ],
    });
    return { code: 200, data };
  } catch (e) {
    console.log(e.message);
    return { code: 400, message: 'Bad Request' };
  }
}

async function findAllSellerOrders(sellerId) {
  try {
    const data = await Sale.findAll({
      where: { sellerId },
      attributes: { exclude: ['userId', 'sellerId'] },
    });
    return { code: 200, data };
  } catch (e) {
    console.log(e.message);
    return { code: 400, message: 'Bad Request' };
  }
}

async function findOrderDetails(saleId) {
  const data = await salesProduct.findAll({
    where: { saleId },
    attributes: { exclude: ['productId'] },
    include: [
      { model: Product, as: 'product' },
      {
        model: Sale,
        as: 'sale',
        include: [
          { model: User,
            as: 'seller',
            attributes: { exclude: ['password', 'id', 'email'] } },
        ],
        attributes: { exclude: ['userId', 'sellerId'] },
      },
    ],
  });
  return { code: 200, data };
}

async function updateStatus(status, saleId) {
  const id = await Sale.update({ status }, { where: { id: saleId }, limit: 1 });
  return { code: 200, data: { id } };
}

module.exports = { findAllCustomerOrders, findAllSellerOrders, findOrderDetails, updateStatus };
