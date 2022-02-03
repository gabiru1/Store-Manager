const productsModel = require('../models/productsModel');
const {
  isValidName,
  isValidQuantity,
  findById,
  productExist,
} = require('../schemas/productsSchemas');

const createProduct = async (name, quantity) => {
  const allProducts = await productsModel.getAllProducts();
  const validateName = isValidName(name, allProducts);
  const validateQuantity = isValidQuantity(quantity);
  const exist = productExist(name, allProducts);

  if (exist.message) return exist;

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

const updateProduct = async (name, quantity, id) => {
  const allProducts = await productsModel.getAllProducts();
  const validateName = isValidName(name, allProducts);
  const validateQuantity = isValidQuantity(quantity);
  const productNotFound = findById(id, allProducts);

  if (productNotFound.message) return productNotFound;

  if (validateName.message) return validateName;

  if (validateQuantity.message) return validateQuantity;

  const changedProduct = await productsModel.updateProduct(name, quantity, id);

  return changedProduct;
};

const deleteProduct = async (id) => {
  const allProducts = await productsModel.getAllProducts();
  const exist = findById(id, allProducts);

  if (exist.message) return exist;

  const deletedProduct = allProducts.find((product) => product.id === Number(id));

  await productsModel.deleteProduct(id);

  return { id: deletedProduct.id, name: deletedProduct.name, quantity: deletedProduct.quantity };
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};