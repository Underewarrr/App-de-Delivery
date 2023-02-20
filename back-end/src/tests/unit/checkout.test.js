const checkoutService = require("../../services/checkout");
const checkoutController = require("../../controllers/checkout");
const sinon = require("sinon");
const chai = require("chai");
chai.use(require("sinon-chai"));
const { expect } = chai;
const { Sale, salesProduct } = require("../../database/models");
const {
  successCreateReqBody,
  serviceCheckoutReturn,
  badRequestError,
  createdCheckout,
} = require("./mocks/checkoutMock");

describe("Testes unitários do checkout", function () {
  describe("Testes unitários do controller checkout", function () {
    afterEach(sinon.restore);
    it("Verifica se é possivel criar uma sale com sucesso", async function () {
      sinon.stub(checkoutService, "createSale").resolves(serviceCheckoutReturn);
      const res = {};
      const req = {
        headers: {
          authorization: 1,
        },
        body: {
          ...successCreateReqBody,
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await checkoutController.create(req, res);

      expect(res.status).to.have.been.calledOnceWith(201);
      expect(res.json).to.have.been.calledWith({
        data: serviceCheckoutReturn.data,
      });
    });

    it("Verifica se é retornado um erro tentar criar uma sale com dados incorretos", async function () {
      sinon.stub(checkoutService, "createSale").resolves(badRequestError);
      const res = {};
      const req = {
        headers: {
          authorization: 1,
        },
        body: {
          ...successCreateReqBody,
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await checkoutController.create(req, res);

      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledWith({ message: "Bad Request" });
    });
  });

  describe("Testes unitários do service checkout", function () {
    afterEach(sinon.restore);
    it("Verifica se é possível criar uma sale com sucesso", async function () {
      sinon.stub(Sale, "create").resolves(createdCheckout);
      sinon.stub(salesProduct, "create").resolves({});

      const service = await checkoutService.createSale(successCreateReqBody, 1);

      expect(service).to.be.deep.equal({ code: 201, data: createdCheckout });
    });

    it("Verifica se é retornado um erro ao passar dados inválidos", async function () {
      sinon.stub(Sale, "create").throws('Error');

      const service = await checkoutService.createSale({}, 1);

      expect(service).to.be.deep.equal(badRequestError);
    });
  });
});
