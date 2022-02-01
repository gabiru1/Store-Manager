const isValidName = (name, verify) => {
  if (!name) return { code: 400, message: '"name" is required' };

  if (name.length < 5) {
  return { code: 422, message: '"name" length must be at least 5 characters long' };
}

  if (verify.some((product) => product.name === name)) {
    return { code: 409, message: 'Product already exists' };
  }

  return {};
};

const isValidQuantity = (quantity) => {
  if (typeof quantity === 'string' || quantity <= 0) {
    return { code: 422, message: '"quantity" must be a number larger than or equal to 1' };
  } 
  if (!quantity) return { code: 400, message: '"quantity" is required' };

  return {};
};

module.exports = {
  isValidName,
  isValidQuantity,
};