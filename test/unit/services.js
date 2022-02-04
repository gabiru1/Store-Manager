const sinon = require("sinon");
const { expect } = require("chai");

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');
const salesService = require('../../services/salesService');

const allProducts = [
  {
    "id": 1,
    "name": "Teclado Gamer",
    "quantity": 10
  },
  {
    "id": 2,
    "name": "Mouse Gamer",
    "quantity": 20
  }
];

const createBody = {
  name: "Cadeira Gamer",
  quantity: 15
};

const updateBody = {
  id: 2,
  name: "Mouse Gamer",
  quantity: 25
}



describe('Testa a camada services', () => {
  describe('Adiciona um produto com sucesso', () => {
    before(async () => {
      const product = { id: 1, name: "Teclado Gamer", quantity: 10 };
      sinon.stub(productsModel, 'createProduct').resolves(product);
      sinon.stub(productsModel, 'getAllProducts').resolves(allProducts)
    });

    after(async () => {
      productsModel.createProduct.restore();
      productsModel.getAllProducts.restore();
    });

    it('retorna um objeto com as propiedades "id", "name" e "quantity"', async () => {
      const newProduct = await productsService.createProduct(createBody.name, createBody.quantity);

      expect(newProduct).to.have.a.property('id');
      expect(newProduct).to.have.a.property('name');
      expect(newProduct).to.have.a.property('quantity');
    });
});

  describe('Retorna todos os produtos', async () => {
    describe('Quando não existir produtos cadastrados', async () => {
      before(async () => {
        const mock = []
        sinon.stub(productsModel, 'getAllProducts').resolves(mock);
      });

      after(async () => {
        productsModel.getAllProducts.restore();
      });

      it('retorna um array vazio', async () => {
        const response = await productsService.getAllProducts();
        expect(response).to.be.empty;
      });
    });

    describe('Quando existir produtos cadastrados', async () => {
      before(async () => {
        const mockedProducts = allProducts;
        sinon.stub(productsModel, 'getAllProducts').resolves(mockedProducts);
      });

      after(async () => {
        productsModel.getAllProducts.restore();
      });

      it('retorna os produtos esperados', async () => {
        const products = await productsService.getAllProducts();

        expect(products).to.be.deep.equal(allProducts);
      });
    });
  });

  describe('Retorno de um produto por id', async () => {
    before(async () => {
      const mockedProduct = allProducts[1];
      sinon.stub(productsModel, 'getProductById').resolves(mockedProduct);
      sinon.stub(productsModel, 'getAllProducts').resolves(allProducts);
    });

    after(async () => {
      productsModel.getProductById.restore();
      productsModel.getAllProducts.restore();
    });

    it('retorna o produto esperado', async () => {
      const product = await productsService.getProductById(2);
      expect(product).to.be.deep.equal(allProducts[1]);
    });
  });
});