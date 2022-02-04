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

const getAllSales = async () => {
  const [allSales] = await connection.execute(
    `SELECT sales.id AS saleId, sales.date, products.product_id, products.quantity
      FROM StoreManager.sales AS sales
      INNER JOIN StoreManager.sales_products AS products ON sale_id = sales.id`,
  );

  console.log(allSales);

  return allSales;
};

const getSaleById = async (id) => {
  const [saleByID] = await connection.execute(
    `SELECT sales.date, products.product_id, products.quantity
      FROM StoreManager.sales AS sales
      INNER JOIN StoreManager.sales_products AS products ON sale_id = sales.id
      WHERE id= ?`,
    [id],
  );
  return saleByID;
};

const updateSale = async (id, sale) => {
  const changedSale = await connection.execute(
    'UPDATE StoreManager.sales_products SET product_id= ?, quantity= ? WHERE sale_id= ?',
    [sale[0].product_id, sale[0].quantity, id],
  );
  return changedSale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
};