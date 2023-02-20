const ordersService = require("../../services/orders");
const ordersController = require("../../controllers/orders");
const sinon = require("sinon");
const chai = require("chai");
chai.use(require("sinon-chai"));
const { expect } = chai;
const { Sale, salesProduct } = require("../../database/models");
const {
  ordersArray,
  ordersBySellerArray,
  badRequestError,
  orderDetailsArray,
} = require("./mocks/orderMock");

describe("Testes unitários do orders", function () {
  describe("Testes unitários do controller orders", function () {
    afterEach(sinon.restore);
    it("Verifica se é possivel retornar todos os pedidos de um cliente", async function () {
      sinon
        .stub(ordersService, "findAllCustomerOrders")
        .resolves({ code: 200, data: ordersArray });
      const res = {};
      const req = {
        headers: {
          authorization: 1,
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await ordersController.findAllCustomerOrders(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledWith({
        data: ordersArray,
      });
    });

    it("Verifica se é retornado um erro ao dar algum erro na hora de pegar os pedidos", async function () {
      sinon
        .stub(ordersService, "findAllCustomerOrders")
        .resolves({ code: 400, message: "Bad Request" });
      const res = {};
      const req = {
        headers: {
          authorization: 1,
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await ordersController.findAllCustomerOrders(req, res);

      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledWith({
        message: badRequestError.message,
      });
    });

    it("Verifica se é possível pegar todos os pedidos usando o id do seller", async function () {
      sinon
        .stub(ordersService, "findAllSellerOrders")
        .resolves({ code: 200, data: ordersBySellerArray });
      const res = {};
      const req = {
        headers: {
          authorization: 2,
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await ordersController.findAllSellerOrders(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledWith({
        data: ordersBySellerArray,
      });
    });

    it("Verifica se é retornado um erro ao dar algum erro na hora de pegar os pedidos pelo id do seller", async function () {
      sinon
        .stub(ordersService, "findAllSellerOrders")
        .resolves({ code: 400, message: "Bad Request" });
      const res = {};
      const req = {
        headers: {
          authorization: 2,
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await ordersController.findAllSellerOrders(req, res);

      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledWith({
        message: badRequestError.message,
      });
    });

    it("Verifica se é possível pegar os detalhes de um pedido", async function () {
      sinon
        .stub(ordersService, "findOrderDetails")
        .resolves({ code: 200, data: orderDetailsArray });
      const res = {};
      const req = {
        headers: {
          authorization: 1,
        },
        params: {
          id: 1,
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await ordersController.findDetails(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledWith({
        data: orderDetailsArray,
      });
    });

    it("Verifica se é possível atualizar o status de um pedido", async function () {
      sinon
        .stub(ordersService, "updateStatus")
        .resolves({ code: 200, data: { id: 1 } });
      const res = {};
      const req = {
        body: {
          status: "Entregue",
        },
        headers: {
          authorization: 1,
        },
        params: {
          id: 1,
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await ordersController.updateStatus(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledWith({
        data: { id: 1 },
      });
    });
  });

  describe("Testes unitários do service order", function () {
    afterEach(sinon.restore);
    it("Verifica se é possivel retornar todos os pedidos de um cliente", async function () {
      sinon.stub(Sale, "findAll").resolves(ordersArray);
      const service = await ordersService.findAllCustomerOrders(1);

      expect(service).to.be.deep.equal({ code: 200, data: ordersArray });
    });

    it("Verifica se é retornado um erro ao dar algum erro na hora de pegar os pedidos", async function () {
      sinon.stub(Sale, "findAll").throws("Erro");
      const service = await ordersService.findAllCustomerOrders(1);

      expect(service).to.be.deep.equal({
        code: 400,
        message: badRequestError.message,
      });
    });

    it("Verifica se é possível pegar todos os pedidos usando o id do seller", async function () {
      sinon.stub(Sale, "findAll").resolves(ordersBySellerArray);
      const service = await ordersService.findAllSellerOrders(2);

      expect(service).to.be.deep.equal({
        code: 200,
        data: ordersBySellerArray,
      });
    });

    it("Verifica se é retornado um erro ao dar algum erro na hora de pegar os pedidos pelo id do seller", async function () {
      sinon.stub(Sale, "findAll").throws("Erro");
      const service = await ordersService.findAllSellerOrders(2);

      expect(service).to.be.deep.equal({
        code: 400,
        message: badRequestError.message,
      });
    });

    it("Verifica se é possível pegar os detalhes de um pedido", async function () {
      sinon.stub(salesProduct, "findAll").resolves(orderDetailsArray);
      const service = await ordersService.findOrderDetails(1);

      expect(service).to.be.deep.equal({ code: 200, data: orderDetailsArray });
    });

    it("Verifica se é possível atualizar o status de um pedido", async function () {
      sinon.stub(Sale, "update").resolves(1);
      const service = await ordersService.updateStatus("Entregue", 1);

      expect(service).to.be.deep.equal({ code: 200, data: { id: 1 } });
    });
  });
});
