const productsModel = require('../models/productsModel');
const { isValidName, isValidQuantity, findById } = require('../schemas/productsSchemas');

const createProduct = async (name, quantity) => {
  const allProducts = await productsModel.getAllProducts();
  const validateName = isValidName(name, allProducts);
  const validateQuantity = isValidQuantity(quantity);

  if (validateName.message) return validateName;

  if (validateQuantity.message) return validateQuantity;

  const newProduct = await productsModel.createProduct(name, quantity);

  return newProduct;
};

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();
  return allProducts;
};

const getProductById = async (id) => {
  const allProducts = await productsModel.getAllProducts();
  const productById = findById(id, allProducts);
  
  if (productById.message) return productById;

  const product = await productsModel.getProductById(id);
  
  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};