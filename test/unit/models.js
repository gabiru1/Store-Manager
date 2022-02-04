const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');

const allProducts = [
  {
    "id": 1,
    "name": "Cadeira Gamer",
    "quantity": 10
  },
  {
    "id": 2,
    "name": "Teclado Gamer",
    "quantity": 25
  }
];

const productExample = {
  name: "Mouse Gamer",
  quantity: 15
};

const updatedExample = {
  id: 2,
  name: "Mouse Ruim",
  quantity: 200
}



describe('Testa a camada model', () => {
  describe('Adiciona um produto', () => {
    before(async () => {
      const execute = [{ insertId : 1 }]
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto {"id", "name", "quantity"}', async () => {
      const newProduct = await productsModel.createProduct(productExample.name, productExample.quantity);

      expect(newProduct).to.have.a.property('id');
      expect(newProduct).to.have.a.property('name');
      expect(newProduct).to.have.a.property('quantity');
    });

    it('retorna o objeto', async () => {
      const expectedProduct = {
        "id": 1,
        "name": "Mouse Gamer",
        "quantity": 15,
      };
      const newProduct = await productsModel.createProduct(productExample.name, productExample.quantity);
      expect(newProduct).to.be.deep.equal(expectedProduct);
    });
  });

  describe('Retorna todos os produtos', async () => {
    describe('Quando não existir produtos cadastrados', async () => {
      before(async () => {
        const mock = [[], [{}], [{}] ]
        sinon.stub(connection, 'execute').resolves(mock);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('retorna um array vazio', async () => {
        const allDataBaseProducts = await productsModel.getAllProducts();
        expect(allDataBaseProducts).to.be.empty;
      });
    });

    describe('Quando existir produtos cadastrados', async () => {
      before(async () => {
        const exampleProducts = [ allProducts ]
        sinon.stub(connection, 'execute').resolves(exampleProducts);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('retorna um array de objetos com as propiedades "id", "name" e "quantity"', async () => {
        const [product] = await productsModel.getAllProducts();

        expect(product).to.be.a.property('id');
        expect(product).to.be.a.property('name');
        expect(product).to.be.a.property('quantity');
      });

      it('retorna os produtos esperados', async () => {
        const products = await productsModel.getAllProducts();

        expect(products).to.be.deep.equal(allProducts);
      });
    });
  });

  describe('Retorno de um produto por id', async () => {
    before(async () => {
      const exampleProducts = [ allProducts ]
      sinon.stub(connection, 'execute').resolves(exampleProducts);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um produto com as propiedades "id", "name", "quantity"', async () => {
      const product = (await productsModel.getProductById(2))[0];

      expect(product).to.be.a.property('id');
      expect(product).to.be.a.property('name');
      expect(product).to.be.a.property('quantity');
    });

    it('retorna o produto esperado', async () => {
      const product = (await productsModel.getProductById(2))[0];
      expect(product).to.be.deep.equal(allProducts[0]);
    });
  });

  describe('Atualiza um produto pelo id', async () => {
    before(async () => {
      const exampleProducts = [allProducts];
      sinon.stub(connection, 'execute').resolves(exampleProducts);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('atualiza as informações do produto', async () => {
      const updateProduct = await productsModel.updateProduct(updatedExample.name, updatedExample.quantity, 2);
      expect(updateProduct).to.be.deep.equal(updatedExample);
    });
  });

});