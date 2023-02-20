const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { User, Sale, salesProduct } = require("../../database/models");
const app = require("../../api/app");
const { userDbInfo, loginSendInfo } = require("./mocks/userMock");
const { allOrders, orderDetails } = require("./mocks/ordersMock");

chai.use(chaiHttp);
const { expect } = chai;

describe("Testes de integração da rota orders", function () {
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

  it("Verifica se é possível pegar todos os pedidos com sucesso, usando o id de usuario", async function () {
    sinon.stub(Sale, "findAll").resolves(allOrders);
    const chaiResponse = await chai
      .request(app)
      .get("/orders/customer")
      .set({ Authorization: token });

    expect(chaiResponse.status).to.be.equal(200);
    expect(chaiResponse.body).to.be.deep.equal({ data: allOrders });
  });

  it("Verifica se é retornado uma mensagem de erro ao dar erro no findAll do cliente", async function () {
    sinon.stub(Sale, "findAll").throws("Erro");
    const chaiResponse = await chai
      .request(app)
      .get("/orders/customer")
      .set({ Authorization: token });

    expect(chaiResponse.status).to.be.equal(400);
    expect(chaiResponse.body).to.be.deep.equal({ message: "Bad Request" });
  });

  it("Verifica se é possível pegar todos os pedidos com sucesso, usando o id do vendedor", async function () {
    sinon.stub(Sale, "findAll").resolves(allOrders);
    const chaiResponse = await chai
      .request(app)
      .get("/orders/seller")
      .set({ Authorization: token });

    expect(chaiResponse.status).to.be.equal(200);
    expect(chaiResponse.body).to.be.deep.equal({ data: allOrders });
  });

  it("Verifica se é retornado uma mensagem de erro ao dar erro no findAll do vendedor", async function () {
    sinon.stub(Sale, "findAll").throws("Erro");
    const chaiResponse = await chai
      .request(app)
      .get("/orders/seller")
      .set({ Authorization: token });

    expect(chaiResponse.status).to.be.equal(400);
    expect(chaiResponse.body).to.be.deep.equal({ message: "Bad Request" });
  });

  it("Verifica se é possível pegar os detalhes do pedido", async function () {
    sinon.stub(salesProduct, "findAll").resolves(orderDetails);
    const chaiResponse = await chai
      .request(app)
      .get("/orders/1")
      .set({ Authorization: token });

    expect(chaiResponse.status).to.be.equal(200);
    expect(chaiResponse.body).to.be.deep.equal({ data: orderDetails });
  });

  it("Verifica se é possível atualizar o status do pedido", async function () {
    sinon.stub(Sale, "update").resolves([1]);
    const chaiResponse = await chai
      .request(app)
      .patch("/orders/1")
      .send({ status: "Entregue" })
      .set({ Authorization: token });

    expect(chaiResponse.status).to.be.equal(200);
    expect(chaiResponse.body).to.be.deep.equal({
      data: {
        id: [1],
      },
    });
  });
});
