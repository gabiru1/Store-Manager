const connection = require('./connection');

const createSale = async (sale) => {
  const [newSale] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUES ()',
  );

  const data = sale.map(({ product_id: productId, quantity }) =>
    connection.execute(
      'INSERT INTO StoreManager.sales_products VALUES (?, ?, ?)',
      [newSale.insertId, productId, quantity],
    ));

  await Promise.all(data);

  return newSale;
};

module.exports = {
  createSale,
};