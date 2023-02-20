const productService = require("../../services/products");
const productController = require("../../controllers/products");
const sinon = require("sinon");
const chai = require("chai");
chai.use(require("sinon-chai"));
const { expect } = chai;
const { Product } = require("../../database/models");
const { serviceProductReturn, serverError, productsArray } = require("./mocks/productMock");

describe("Testes unitários do products", function () {
  describe("Testes unitários do controller product", function () {
    afterEach(sinon.restore);
    it("Verifica se é possivel pegar todos os produtos com sucesso", async function () {
      sinon.stub(productService, "findAllProducts").resolves(serviceProductReturn);
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await productController.findAllProducts(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledWith({ data: serviceProductReturn.data });
    });

    it("Verifica se é retornado um erro ao ocorrer algum erro interno", async function () {
      sinon.stub(productService, "findAllProducts").resolves(serverError);
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await productController.findAllProducts(req, res);

      expect(res.status).to.have.been.calledOnceWith(500);
      expect(res.json).to.have.been.calledWith({ message: 'Erro interno!' });
    });
  });

  describe("Testes unitários do service product", function () {
    afterEach(sinon.restore);
    it("Verifica se é retornado todos os produtos com sucesso", async function () {
      sinon.stub(Product, "findAll").resolves(productsArray);

      const service = await productService.findAllProducts();

      expect(service).to.be.deep.equal(serviceProductReturn);
    });

    it("Verifica se é retornado um erro ao não achar os produtos no banco de dados", async function () {
      sinon.stub(Product, "findAll").resolves(null);

      const service = await productService.findAllProducts();

      expect(service).to.be.deep.equal(serverError);
    });
  });
});
