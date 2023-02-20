const chai = require('chai');

const chaiHttp = require('chai-http');
const sinon = require('sinon');
const models = require('../../database/models/');

const app = require('../../api/app');


chai.use(chaiHttp);

describe('routes/RegisterUser', () => {

  afterEach(sinon.restore);

  describe('controllers/registerController', () => {

    it('Deve retornar status code 409, quando o usuário já for cadastrado.', async () => {
      sinon.stub(models.User, 'findOne').resolves({});
      const response = await chai.request(app)
      .post('/register')
      .send({
        name: "teste",
        email: "seller@deliveryapp1.com",
        password: "--sell2@23!!--"
      });
      chai.expect(response.status).to.be.equal(409);
    });
  });

  it('Deve retornar status code 201 e um objeto contetndo "id", "name", "role", "email" e "token", quando o usuário for cadastrado com sucesso,', async () => {
    const dataValues = {
      id: 2,
      name: 'teste',
      password: 'fakePassword',
      roule: 'customer'
    };
    sinon.stub(models.User, 'findOne').resolves(false);
    sinon.stub(models.User, 'create').resolves({dataValues});
    const response = await chai.request(app)
    .post('/register')
    .send({
        name: "teste",
        email: "customer@deliveryapp1.com",
        password: "--customer2@23!!--"
      }
    );
    chai.expect(response.status).to.be.equal(201);
    chai.expect(response.body).to.contain.keys(['id', 'name','password', 'roule', 'token']);
  });
});