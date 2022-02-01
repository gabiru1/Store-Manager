const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const [newProduct] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
  return {
    id: newProduct.insertId,
    name,
    quantity,
  };
};

module.exports = {
  createProduct,
};