const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { User } = require("../../database/models");
const app = require("../../api/app");
const jwt = require("jsonwebtoken");
const {
  userDbInfo,
  loginSendInfo,
  returnedLoginInfo,
} = require("./mocks/userMock");

chai.use(chaiHttp);
const { expect } = chai;

describe("Testes de integração da rota users", function () {
  afterEach(sinon.restore);

  it("Verifica se ao fazer login com sucesso é retornado as informações do usuario junto com um token", async function () {
    sinon.stub(User, "findOne").resolves(userDbInfo);
    sinon.stub(jwt, "sign").returns("token");
    const chaiResponse = await chai
      .request(app)
      .post("/login")
      .send(loginSendInfo);

    expect(chaiResponse.status).to.be.equal(200);
    expect(chaiResponse.body).to.be.deep.equal(returnedLoginInfo);
  });

  it("Verifica se ao tentar fazer login com um email não cadastrado é retornado um erro", async function () {
    sinon.stub(User, "findOne").resolves(null);
    const chaiResponse = await chai
      .request(app)
      .post("/login")
      .send({ email: "dwa", password: "w" });
    expect(chaiResponse.status).to.be.equal(404);
    expect(chaiResponse.body).to.be.deep.equal({
      message: "Cliente não encontrado!",
    });
  });

  it("Verifica se ao tentar fazer login com uma senha incorreta é retornado um erro", async function () {
    sinon.stub(User, "findOne").resolves(userDbInfo);
    const chaiResponse = await chai
      .request(app)
      .post("/login")
      .send({ email: userDbInfo.email, password: "w" });
    expect(chaiResponse.status).to.be.equal(401);
    expect(chaiResponse.body).to.be.deep.equal({
      message: "Email ou senha incorretas",
    });
  });

  it("Verifica se ao fazer uma requisição para a rota /sellers todos os vendedores são retornados", async function () {
    sinon.stub(User, "findAll").resolves([{ id: 2, name: userDbInfo.name }]);
    const chaiResponse = await chai.request(app).get("/sellers");
    expect(chaiResponse.status).to.be.equal(200);
    expect(chaiResponse.body).to.be.deep.equal([
      { id: 2, name: userDbInfo.name },
    ]);
  });
});
