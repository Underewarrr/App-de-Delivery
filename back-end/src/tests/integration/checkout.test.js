const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { User, Sale, salesProduct } = require("../../database/models");
const app = require("../../api/app");
const { userDbInfo, loginSendInfo } = require("./mocks/userMock");
const { saleRes, saleReq } = require("./mocks/checkoutMock");

chai.use(chaiHttp);
const { expect } = chai;

describe("Testes de integração da rota checkout", function () {
  let token;


  this.beforeAll(async () => {
    sinon.stub(User, "findOne").resolves(userDbInfo);
    const chaiResponse = await chai
      .request(app)
      .post("/login")
      .send(loginSendInfo);

    token = chaiResponse.body.token;
  });

  afterEach(sinon.restore);

  it("Verifica se é possível criar uma sale com sucesso", async function () {
    sinon.stub(Sale, "create").resolves(saleRes);
    sinon.stub(salesProduct, "create").resolves({});
    const chaiResponse = await chai
      .request(app)
      .post("/checkout")
      .send(saleReq)
      .set({ Authorization: token });

    expect(chaiResponse.status).to.be.equal(201);
    expect(chaiResponse.body).to.be.deep.equal({ data: saleRes });
  });

  it("Verifica se é retornado um erro ao ocorrer um erro no create da model", async function () {
    sinon.stub(salesProduct, "create").throws("Erro");
    const chaiResponse = await chai
      .request(app)
      .post("/checkout")
      .send(saleReq)
      .set({ Authorization: token });

    expect(chaiResponse.status).to.be.equal(400);
    expect(chaiResponse.body).to.be.deep.equal({ message: "Bad Request" });
  });

  it("Verifica se é retornado um erro ao tentar criar uma sale sem o token", async function () {
    const chaiResponse = await chai
      .request(app)
      .post("/checkout")
      .send(saleReq);

    expect(chaiResponse.status).to.be.equal(401);
    expect(chaiResponse.body).to.be.deep.equal({ message: "Token not found" });
  });

  it("Verifica se é retornado um erro ao tentar criar uma sale com um token inválido", async function () {
    const chaiResponse = await chai
      .request(app)
      .post("/checkout")
      .send(saleReq)
      .set({ Authorization: 'dwadad' });;

    expect(chaiResponse.status).to.be.equal(401);
    expect(chaiResponse.body).to.be.deep.equal({ message: "Expired or invalid token" });
  });
});
