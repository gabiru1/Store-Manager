const productsService = require('../services/productsService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productsService.createProduct(name, quantity);

  if (newProduct.message) return res.status(newProduct.code).json({ message: newProduct.message });

  res.status(201).json(newProduct);
};

const getAllProducts = async (_req, res) => {
  const allProducts = await productsService.getAllProducts();

  res.status(200).json(allProducts);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const productById = await productsService.getProductById(id);

  if (productById.message) {
    return res.status(productById.code).json({ message: productById.message });
  }

  res.status(200).json(productById[0]);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};