const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const sale = req.body;

  const registerSale = await salesService.createSale(sale);

  if (registerSale.message) {
  return res.status(registerSale.code).json({ message: registerSale.message });
  }

  res.status(201).json(registerSale);
};

const getAllSales = async (_req, res) => {
  const allSales = await salesService.getAllSales();

  res.status(200).json(allSales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  
  const saleById = await salesService.getSaleById(id);
  
  if (saleById.message) return res.status(saleById.code).json({ message: saleById.message });

  res.status(200).json(saleById);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};