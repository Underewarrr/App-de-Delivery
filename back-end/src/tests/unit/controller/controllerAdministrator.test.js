const chai = require('chai');
const sinon = require('sinon');
const service = require('../../../services/administrator');
const administrator = require('../../../controllers/administrator');
const { createToken } = require('../../../utils/jwtUtils');

describe('controllers/administrator', () => {
  beforeEach(sinon.restore);
  it('Retornam status code 409 com message', async () => {
    const status =  sinon.stub().callsFake(() => res);
    const json =  sinon.stub().returns();
    const res = {status, json};

    sinon.stub(service, 'administrator').resolves({code: 409, message: 'Usuário existe!'});

    await administrator.administrator({}, res);

    chai.expect(res.status.getCall(0).args[0]).to.be.equal(409);
    chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal({ message: 'Usuário existe!'});
  });

  it('Retorna status code 201 com um objeto com data e token', async () => {
    const status =  sinon.stub().callsFake(() => res);
    const json =  sinon.stub().returns();
    const res = {status, json};

    const data = {
      id: 1,
      name: 'Teste',
      email: 'test@deliveryapp.com',
      password: '12134',
      role: 'customer'
    };

    const {name, role, email} = data;
    sinon.stub(service, 'administrator').resolves({data, code: 201, token: createToken(data.role)});
    await administrator.administrator({}, res);

    chai.expect(status.getCall(0).args[0]).to.be.equal(201);
    chai.expect(json.getCall(0).args[0]).to.be.deep.equal({name,role,email, token: createToken(data.role)});
  });
});