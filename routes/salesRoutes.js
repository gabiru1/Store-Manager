const express = require('express');
const {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
} = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.post('/', createSale);

salesRouter.get('/', getAllSales);

salesRouter.get('/:id', getSaleById);

salesRouter.put('/:id', updateSale);

module.exports = {
  salesRouter,
};