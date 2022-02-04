const salesModel = require('../models/salesModel');
const { validateProducts, validateQuantity } = require('../schemas/salesSchemas');

const createSale = async (sale) => {
  const isValidProducts = validateProducts(sale);
  const isValidQuantity = validateQuantity(sale);

  if (isValidProducts.message) return isValidProducts;

  if (isValidQuantity.message) return isValidQuantity;

  const newSale = await salesModel.createSale(sale);

  const response = {
    id: newSale.insertId,
    itemsSold: sale,
  };

  return response;
};

module.exports = {
  createSale,
};