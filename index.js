const bodyParser = require('body-parser');
const express = require('express');
const { productsRouter } = require('./src/routes/productsRoutes');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use('/products', productsRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
