const { Sale, salesProduct } = require('../database/models');

async function createSaleProducts(productsArray, saleId) {
  await Promise.all(
    productsArray.map(async ({ productId, quantity }) => {
      await salesProduct.create({ saleId, productId, quantity });
    }),
  );
}

async function createSale(reqBody, userId) {
  try {
    const { totalPrice, deliveryAddress, deliveryNumber, status, products, sellerId } = reqBody;
    const statusMessage = status || 'Pendente';
    const saleDate = new Date().toISOString();
    const data = await Sale.create(
      { userId,
        sellerId,
        totalPrice,
        deliveryAddress,
        deliveryNumber, 
        saleDate, 
        status: statusMessage },
    );
    await createSaleProducts(products, data.id);
    return { code: 201, data };
  } catch (_e) {
    return { code: 400, message: 'Bad Request' };
  }
}

module.exports = { createSale };
