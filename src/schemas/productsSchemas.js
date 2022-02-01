const isValid = (name) => {
  if (!name) return { code: 400, message: '"name" is required' };

  if (name.length < 5) {
  return { code: 422, message: '"name" length must be at least 5 characters long' };
}

  return {};
};

module.exports = {
  isValid,
};