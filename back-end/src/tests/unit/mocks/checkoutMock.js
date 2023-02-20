const successCreateReqBody = {
  totalPrice: 20.5,
  deliveryAddress: "Rua teste",
  deliveryNumber: 44,
  sellerId: 2,
  products: [
    { productId: 3, quantity: 1 },
    { productId: 2, quantity: 20 },
  ],
};

const createdCheckout = {
  id: 1,
  userId: 1,
  sellerId: 2,
  totalPrice: 20.5,
  deliveryAddress: "Rua teste",
  deliveryNumber: 44,
  saleDate: "2023-01-31T18:39:28.516Z",
  status: "Pendente",
};

const serviceCheckoutReturn = {
  code: 201,
  data: createdCheckout
}

const badRequestError = { code: 400, message: 'Bad Request' }

module.exports = { successCreateReqBody, serviceCheckoutReturn, badRequestError, createdCheckout };
