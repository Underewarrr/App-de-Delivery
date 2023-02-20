const sinon = require('sinon');
const chai = require('chai');
const models = require('../../../database/models');
const { administrator } = require('../../../services/administrator');
const { createToken } = require('../../../utils/jwtUtils');


describe('service/Administrator', () => {
  beforeEach(sinon.restore);
  it('Deve retornar um objeto com status code 409 e message "Usuário existe!"', async() => {
    const user = {
      name: 'Usuário Teste',
      email: 'user@deliveryapp.com',
      password: '12134'
    };
    sinon.stub(models.User, 'findOne').resolves({});
    const response = await administrator(user);

    chai.expect(response).to.be.deep.equal({code: 409, message: 'Usuário existe!'});
  });

  it('Deve retornar um objeto com data, code e token com sucesso', async () => {

    const user = {
      name: 'Usuário Teste',
      email: 'user@deliveryapp.com',
      password: '12134',
      role: 'customer'
    };

    const dataValues = {
      id: 2,
      name: 'Usuário Teste',
      email: 'user@deliveryapp.com',
      password: '12134',
      role: 'customer'
    };

    sinon.stub(models.User, 'findOne').resolves(false);
    sinon.stub(models.User, 'create').resolves({dataValues});

    const response = await administrator(user);

    chai.expect(response).to.be.deep.equal({
      data: dataValues,
      code: 201,
      token: createToken(dataValues.role),
    });
  });
});