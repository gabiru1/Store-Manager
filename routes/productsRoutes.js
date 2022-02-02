const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
} = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.post('/', createProduct);

productsRouter.get('/', getAllProducts);

productsRouter.get('/:id', getProductById);

module.exports = {
  productsRouter,
};