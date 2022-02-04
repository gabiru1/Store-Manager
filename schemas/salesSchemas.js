const validateProducts = (sales) => {
  if (sales.every((sale) => sale.product_id === undefined)) {
    return { code: 400, message: '"product_id" is required' };
  }

  return {};
};

const validateQuantity = (sales) => {
  if (sales.every((sale) => typeof sale.quantity === 'string' || sale.quantity <= 0)) {
    return { code: 422, message: '"quantity" must be a number larger than or equal to 1' };
  }
  
  if (sales.every((sale) => sale.quantity === undefined)) {
    return { code: 400, message: '"quantity" is required' };
  }

  return {};
};

module.exports = {
  validateProducts,
  validateQuantity,
};