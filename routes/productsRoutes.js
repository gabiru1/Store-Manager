const express = require('express');
const { createProduct } = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.post('/', createProduct);

module.exports = {
  productsRouter,
};