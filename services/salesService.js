const salesModel = require('../models/salesModel');
const { validateProducts, validateQuantity, findById } = require('../schemas/salesSchemas');

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

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();

  return allSales;
};

const getSaleById = async (id) => {
  const allSales = await salesModel.getAllSales();
  const exist = findById(id, allSales);

  if (exist.message) return exist;

  const saleById = await salesModel.getSaleById(id);

  return saleById;
};

const updateSale = async (id, sale) => {
  const isValidProducts = validateProducts(sale);
  const isValidQuantity = validateQuantity(sale);

  if (isValidProducts.message) return isValidProducts;

  if (isValidQuantity.message) return isValidQuantity;

  await salesModel.updateSale(id, sale);

  return {
    saleId: Number(id),
    itemUpdated: sale,
  };
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
};