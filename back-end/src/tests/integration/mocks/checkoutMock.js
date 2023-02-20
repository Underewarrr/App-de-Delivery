const saleReq = {
  totalPrice: 20.5,
  deliveryAddress: "Rua do samba",
  deliveryNumber: 44,
  sellerId: 2,
  products: [
    { productId: 4, quantity: 2 },
    { productId: 2, quantity: 1 },
  ],
};

const saleRes = {
  id: 2,
  userId: 2,
  sellerId: 2,
  totalPrice: 20.5,
  deliveryAddress: "Rua do samba",
  deliveryNumber: 44,
  saleDate: "2023-01-27T20:00:11.096Z",
  status: "Pendente",
};

module.exports = { saleReq, saleRes }
