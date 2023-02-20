const { userRoleEmailName } = require("./userMock");

const allOrders = [
  {
    id: 1,
    totalPrice: "33.50",
    deliveryAddress: "Rua existente",
    deliveryNumber: "111",
    saleDate: "2023-01-30T01:08:18.000Z",
    status: "Pendente",
    seller: {
      id: 1,
      ...userRoleEmailName,
    },
    user: {
      id: 2,
      name: "Robson da silva",
      role: "customer",
      email: "robson@cliente.com",
    },
  },
  {
    id: 2,
    totalPrice: "20.50",
    deliveryAddress: "Rua teste",
    deliveryNumber: "44",
    saleDate: "2023-01-30T01:09:58.000Z",
    status: "Pendente",
    seller: {
      id: 1,
      ...userRoleEmailName,
    },
    user: {
      id: 2,
      name: "Robson da silva",
      role: "customer",
      email: "robson@cliente.com",
    },
  },
];

const orderDetails = [
  {
    saleId: 1,
    quantity: 10,
    product: {
      id: 2,
      name: "Heineken 600ml",
      price: "7.50",
      urlImage: "http://localhost:3001/images/heineken_600ml.jpg",
    },
    sale: {
      id: 1,
      totalPrice: "20.50",
      deliveryAddress: "fgfffff",
      deliveryNumber: "22",
      saleDate: "2023-01-30T01:08:18.000Z",
      status: "Pendente",
      seller: {
        name: "Fulana Pereira",
        role: "seller",
      },
    },
  },
  {
    saleId: 1,
    quantity: 5,
    product: {
      id: 3,
      name: "Antarctica Pilsen 300ml",
      price: "2.49",
      urlImage: "http://localhost:3001/images/antarctica_pilsen_300ml.jpg",
    },
    sale: {
      id: 1,
      totalPrice: "20.50",
      deliveryAddress: "fgfffff",
      deliveryNumber: "22",
      saleDate: "2023-01-30T01:08:18.000Z",
      status: "Pendente",
      seller: {
        name: "Fulana Pereira",
        role: "seller",
      },
    },
  },
];

module.exports = { orderDetails, allOrders };
