const sellerInfo = {
  id: 2,
  name: "Fulana Pereira",
  email: "fulana@deliveryapp.com",
  role: "seller",
};

const userInfo = {
  id: 1,
  name: "Cliente Zé Birita",
  email: "zebirita@email.com",
  role: "customer",
};

const ordersArray = [
  {
    id: 1,
    totalPrice: "27.50",
    deliveryAddress: "Rua teste",
    deliveryNumber: "44",
    saleDate: "2023-02-01T18:08:54.000Z",
    status: "Pendente",
    seller: {
      ...sellerInfo,
    },
    user: {
      ...userInfo,
    },
  },
  {
    id: 2,
    totalPrice: "15.90",
    deliveryAddress: "Rua teste",
    deliveryNumber: "44",
    saleDate: "2023-02-01T18:09:39.000Z",
    status: "Pendente",
    seller: {
      ...sellerInfo,
    },
    user: {
      ...userInfo,
    },
  },
];

const ordersBySellerArray = [
  {
    id: 1,
    totalPrice: "20.50",
    deliveryAddress: "Rua teste",
    deliveryNumber: "44",
    saleDate: "2023-02-01T18:08:54.000Z",
    status: "Pendente",
  },
  {
    id: 2,
    totalPrice: "15.90",
    deliveryAddress: "Rua teste",
    deliveryNumber: "44",
    saleDate: "2023-02-01T18:09:39.000Z",
    status: "Pendente",
  },
];

const orderDetailsArray = [
  {
    saleId: 1,
    quantity: 3,
    product: {
      id: 2,
      name: "Heineken 600ml",
      price: "7.50",
      urlImage: "http://localhost:3001/images/heineken_600ml.jpg",
    },
    sale: {
      id: 1,
      totalPrice: "27.50",
      deliveryAddress: "Rua teste",
      deliveryNumber: "44",
      saleDate: "2023-02-01T18:08:54.000Z",
      status: "Pendente",
      seller: {
        name: sellerInfo.name,
        role: sellerInfo.role,
      },
    },
  },
  {
    saleId: 1,
    quantity: 2,
    product: {
      id: 3,
      name: "Antarctica Pilsen 300ml",
      price: "2.50",
      urlImage: "http://localhost:3001/images/antarctica_pilsen_300ml.jpg",
    },
    sale: {
      id: 1,
      totalPrice: "27.50",
      deliveryAddress: "Rua teste",
      deliveryNumber: "44",
      saleDate: "2023-02-01T18:08:54.000Z",
      status: "Pendente",
      seller: {
        name: sellerInfo.name,
        role: sellerInfo.role,
      },
    },
  },
];

const badRequestError = { code: 400, message: "Bad Request" };

module.exports = { ordersArray, ordersBySellerArray, badRequestError, orderDetailsArray };
