const productsArray = [
  {
    id: 1,
    name: "Skol Lata 250ml",
    price: "2.20",
    urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
  },
  {
    id: 2,
    name: "Heineken 600ml",
    price: "7.50",
    urlImage: "http://localhost:3001/images/heineken_600ml.jpg",
  },
];

const serviceProductReturn = {
  code: 200,
  data: productsArray
}

const serverError = { code: 500, message: 'Erro interno!' }

module.exports = { serviceProductReturn, serverError, productsArray }
