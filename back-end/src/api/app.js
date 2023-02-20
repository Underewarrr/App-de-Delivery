const express = require('express');
const path = require('path');

const app = express();
const cors = require('cors');
const userRoutes = require('../routes/users');
const productsRoutes = require('../routes/products');
const checkoutRoutes = require('../routes/checkout');
const ordersRoutes = require('../routes/orders');
const registerRoutes = require('../routes/registerUser');

const tokenMiddleware = require('../../middlewares/tokenMiddleware');
const administrator = require('../routes/administrator');

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../../../assets/public')));

app.post('/', (req, res) => {
  res.redirect(307, '/login');
});

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(userRoutes);
app.use(registerRoutes);

app.use(productsRoutes);

app.use(tokenMiddleware);

app.use(checkoutRoutes);

app.use(ordersRoutes);

app.use(administrator);

module.exports = app;
