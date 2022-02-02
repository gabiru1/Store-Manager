const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.post('/', createProduct);

productsRouter.get('/', getAllProducts);

productsRouter.get('/:id', getProductById);

productsRouter.put('/:id', updateProduct);

module.exports = {
  productsRouter,
};