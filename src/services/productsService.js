const productsModel = require('../models/productsModel');
const { isValid } = require('../schemas/productsSchemas');

const createProduct = async (name, quantity) => {
  const validateName = await isValid(name);

  if (validateName.message) return validateName;

  const newProduct = await productsModel.createProduct(name, quantity);

  return newProduct;
};

module.exports = {
  createProduct,
};