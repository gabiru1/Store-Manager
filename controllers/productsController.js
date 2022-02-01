const productsService = require('../services/productsService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productsService.createProduct(name, quantity);

  if (newProduct.message) return res.status(newProduct.code).json({ message: newProduct.message });

  res.status(201).json(newProduct);
};

module.exports = {
  createProduct,
};