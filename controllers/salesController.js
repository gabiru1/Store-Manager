const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const sale = req.body;

  const registerSale = await salesService.createSale(sale);

  if (registerSale.message) {
  return res.status(registerSale.code).json({ message: registerSale.message });
  }

  res.status(201).json(registerSale);
};

module.exports = {
  createSale,
};