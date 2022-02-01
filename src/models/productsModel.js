const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const [newProduct] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
  console.log(newProduct);
  return {
    id: newProduct.insertId,
    name,
    quantity,
  };
};

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * from StoreManager.products');

  return products;
};

module.exports = {
  createProduct,
  getAllProducts,
};