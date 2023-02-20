/*
  source: https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/live-lectures/00ea225f-a665-4d52-bce7-29e50443cb50/recording/7f424df4-65b7-4fe7-ab3a-ea2ae87064c6
 */

const sinon = require('sinon');
const chai  = require('chai');
const models = require('../../../database/models');
const { register } = require('../../../services/registerService');
const { createToken } = require('../../../utils/jwtUtils');

  describe('service/Register',() => {
    beforeEach(sinon.restore);
    it('Deve, retornar um objeto com status code 409 e messagem "Usuário existe!" quando o usuário já for cadastrado no banco.', async () => {
      const user = {
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: '12134'
      };
      sinon.stub(models.User, 'findOne').resolves({});
      const response = await register(user);
      chai.expect(response).to.be.deep.equal({code: 409, message: 'Usuário existe!'});
    });
    it('Deve retornar um objeto com data, code e token com sucesso.', async () => {
      const user = {
        name: 'Teste',
        email: 'test@deliveryapp.com',
        password: '12134'
      };
      const dataValues = {
        id: 1,
        name: 'Teste',
        email: 'test@deliveryapp.com',
        password: '12134',
        role: 'customer'
      };

      const data = {
        id: 1,
        name: 'Teste',
        email: 'test@deliveryapp.com',
        password: '12134',
        role: 'customer'
      }; 

      sinon.stub(models.User, 'findOne').resolves(false);
      sinon.stub(models.User, 'create').resolves({ dataValues }); 

      const response = await register(user);
      
      chai.expect(response).to.be.deep.equal({
        data,
        code: 201,
        token: createToken(1),
      });
    });
  });
