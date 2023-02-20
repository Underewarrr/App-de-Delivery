const userService = require("../../services/users");
const userController = require("../../controllers/users");
const sinon = require("sinon");
const chai = require("chai");
const jwt = require("jsonwebtoken");
const {
  serviceLoginReturn,
  loginReturn,
  errorLoginReturn,
  userEmailNotFoundError,
  dbUserInfo,
  sellersArray,
} = require("./mocks/userMock");
chai.use(require("sinon-chai"));
const { expect } = chai;
const { User } = require("../../database/models");

describe("Testes unitários do user", function () {
  describe("Testes unitários do controller user", function () {
    afterEach(sinon.restore);
    it("Verifica se é possivel fazer login com sucesso", async function () {
      sinon.stub(userService, "login").resolves(serviceLoginReturn);
      const res = {};
      const req = {
        body: {
          email: "fulana@deliveryapp.com",
          password: "senhacorreta",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await userController.login(req, res);

      expect(res.status).to.have.been.calledOnceWith(200);
      expect(res.json).to.have.been.calledWith(loginReturn);
    });

    it("Verifica se é retornado uma mensagem de erro ao fazer um login com a senha incorreta", async function () {
      sinon.stub(userService, "login").resolves(errorLoginReturn);
      const res = {};
      const req = {
        body: {
          email: "fulana@deliveryapp.com",
          password: "senhaincorreta",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await userController.login(req, res);

      expect(res.status).to.have.been.calledOnceWith(errorLoginReturn.code);
      expect(res.json).to.have.been.calledWith({
        message: errorLoginReturn.message,
      });
    });

    it("Verifica se é retornado uma mensagem de erro ao tentar fazer um login com email não cadastrado", async function () {
      sinon.stub(userService, "login").resolves(userEmailNotFoundError);
      const res = {};
      const req = {
        body: {
          email: "dwadwad",
          password: "senhaincorreta",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await userController.login(req, res);

      expect(res.status).to.have.been.calledOnceWith(
        userEmailNotFoundError.code
      );
      expect(res.json).to.have.been.calledWith({
        message: userEmailNotFoundError.message,
      });
    });
    
    it("Verifica se é retornado todos os vendedores", async function () {
      sinon.stub(userService, "getSellers").resolves({ code: 200, data: sellersArray });
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await userController.getSellers(req, res);

      expect(res.status).to.have.been.calledOnceWith(
        200
      );
      expect(res.json).to.have.been.calledWith(sellersArray);
    });
  });

  describe("Testes unitários do service user", function () {
    afterEach(sinon.restore);
    it("Verifica se é retornado os dados do usuário, junto com token, ao fazer login com sucesso", async function () {
      sinon.stub(User, "findOne").resolves(dbUserInfo);
      sinon.stub(jwt, "sign").returns("token-falso");

      const userInfo = {
        email: "fulana@deliveryapp.com",
        password: "senhacorreta",
      };

      const service = await userService.login(userInfo);

      expect(service).to.be.deep.equal(serviceLoginReturn);
    });

    it("Verifica se é retornado uma mensagem de usuário não encontrado ao passar um email não cadastrado", async function () {
      sinon.stub(User, "findOne").resolves(null);

      const userInfo = {
        email: "dawuda",
        password: "senhacorreta",
      };

      const service = await userService.login(userInfo);

      expect(service).to.be.deep.equal(userEmailNotFoundError);
    });

    it("Verifica se é retornado uma mensagem de senha incorreta ao passar a senha errada", async function () {
      sinon.stub(User, "findOne").resolves(dbUserInfo);

      const userInfo = {
        email: "fulana@deliveryapp.com",
        password: "senhaincorreta",
      };

      const service = await userService.login(userInfo);

      expect(service).to.be.deep.equal(errorLoginReturn);
    });

    it("Verifica se é retornado todos os vendedores", async function () {
      sinon.stub(User, "findAll").resolves(sellersArray);

      const service = await userService.getSellers();

      expect(service).to.be.deep.equal({ code: 200, data: sellersArray });
    })
  });
});
