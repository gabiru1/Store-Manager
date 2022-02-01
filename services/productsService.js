const productsModel = require('../models/productsModel');
const { isValidName, isValidQuantity } = require('../schemas/productsSchemas');

const createProduct = async (name, quantity) => {
  const allProducts = await productsModel.getAllProducts();
  const validateName = await isValidName(name, allProducts);
  const validateQuantity = await isValidQuantity(quantity);

  if (validateName.message) return validateName;

  if (validateQuantity.message) return validateQuantity;

  const newProduct = await productsModel.createProduct(name, quantity);

  return newProduct;
};

module.exports = {
  createProduct,
};