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

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * from StoreManager.products');

  return products;
};

const getProductById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * from StoreManager.products WHERE id=?',
    [id],
  );
  return product;
};

const updateProduct = async (name, quantity, id) => {
  const [changedProduct] = await connection.execute(
    'UPDATE StoreManager.products SET name= ?, quantity= ? WHERE id= ?',
    [name, quantity, id],
  );
  console.log(changedProduct);
  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id= ?',
    [id],
);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};