const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const models = require('../../database/models');
const jwt = require('jsonwebtoken');


const app = require('../../api/app');

chai.use(chaiHttp);

describe('routes/Administrator', () => {
  afterEach(sinon.restore);
  describe('controllers/deleteUser', () => {
    it('Deve retornar status code 204, quando o usuário for deletado do banco.', async () => {
      const token = 'fakeToken';

      const data = 1;
      sinon.stub(jwt, 'verify').resolves({data: true});
      sinon.stub(models.User, 'destroy').resolves(data);

      jwt.verify(token,'fakeSecret'); // Simula que o token é verdadeiro.
      const response = await chai.request(app).delete('/admin/user/2').set('authorization', `${token}`);

      chai.expect(response.status).to.be.equal(204);
    });
  });
});