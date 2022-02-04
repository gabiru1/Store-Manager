const express = require('express');
const { createSale, getAllSales, getSaleById } = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.post('/', createSale);

salesRouter.get('/', getAllSales);

salesRouter.get('/:id', getSaleById);

module.exports = {
  salesRouter,
};