const express = require('express');
const administratorController = require('../controllers/administrator');

const deleteUserById = require('../controllers/deleteUser');

const administratorRouter = express.Router();

administratorRouter.post('/admin/manage', administratorController.administrator);
administratorRouter.delete('/admin/user/:id', deleteUserById.deleteUser);

module.exports = administratorRouter;
