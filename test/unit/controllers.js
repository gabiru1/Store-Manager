const { expect } = require('chai');
const sinon = require('sinon');

const productService = require('../../services/productsService');
const productController = require('../../controllers/productsController');

describe('Testa camada Controller', () => {
  describe('Adiciona um produto', () => {
    const res = {};
    const req = {};

    before(() => {
      req.body = {
        "name": "Mouse",
        "quantity": 14
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'createProduct').resolves(true);

    });

    after(() => {
      productService.createProduct.restore();
    });

    it('retorna status code 201', async () => {
      await productController.createProduct(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });

  describe('Retorna todos os produtos', () => {
    const res = {};
    const req = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getAllProducts').resolves(true);

    });

    after(() => {
      productService.getAllProducts.restore();
    });

    it('retorna status code 200', async () => {
      await productController.getAllProducts(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Retorna um produto', () => {
    const res = {};
    const req = {};

    before(() => {
      req.params = {
        id: 12
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getProductById').resolves(true);

    });

    after(() => {
      productService.getProductById.restore();
    });

    it('retorna status code 200', async () => {
      await productController.getProductById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Atualiza um produto', () => {
    const res = {};
    const req = {};

    before(() => {
      req.params = {
        id: 12
      };

      req.body = {
        "name": "Mouse",
        "quantity": 14
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'updateProduct').resolves(true);

    });

    after(() => {
      productService.updateProduct.restore();
    });

    it('retorna status code 200', async () => {
      await productController.updateProduct(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

});