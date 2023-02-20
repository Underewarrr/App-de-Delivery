const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const models = require('../../database/models');
const app = require('../../api/app');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

describe('routes/administrator', () => {
  afterEach(sinon.restore);
  describe('controllers/administrator', () => {
    it('Deve retornar status code 409 e message "Usuário existe", quando o usuário já for cadastrado.', async () => {
    
      const token = 'fakeToken';

      sinon.stub(jwt, 'verify').resolves({data: true});
      sinon.stub(models.User, 'findOne').resolves({});

      jwt.verify(token,'fakeSecret'); // Simula que o token é verdadeiro.
      const response = await chai.request(app)
      .post('/admin/manage')
      .send({
        name: "teste",
        email: "seller@deliveryapp.com",
        password: "--sell2@23!!--",
        role: "seller"
      })
      .set('authorization', `${token}`); 
      chai.expect(response.status).to.be.equal(409);
      chai.expect(response.body).to.be.deep.equal({ message: 'Usuário existe!' });
    });
    
    it('Deve retornar status code 201 e um objeto contetndo "name", "role", "email" e "token", quando o usuário for cadastrado com secesso', async () => {
    
      const token = 'fakeToken';

      const dataValues = {
        id: 2,
        name: "teste",
        email: "seller@deliveryapp.com",
        password: "--sell2@23!!--",
        role: "seller"
      };
      
      sinon.stub(jwt, 'verify').resolves({data: true});
      sinon.stub(models.User, 'findOne').resolves(false);
      sinon.stub(models.User, 'create').resolves({dataValues})

      jwt.verify(token,'fakeSecret'); // Simula que o token é verdadeiro.
      const response = await chai.request(app)
      .post('/admin/manage')
      .send({
        name: "teste",
        email: "seller@deliveryapp.com",
        password: "--sell2@23!!--",
        role: "seller"
      })
      .set('authorization', `${token}`);
      chai.expect(response.status).to.be.equal(201);
      chai.expect(response.body).to.contain.keys(['name','role', 'email', 'token']);
    });
  });
});