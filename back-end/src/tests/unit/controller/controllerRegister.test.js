/*
  source: https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/live-lectures/00ea225f-a665-4d52-bce7-29e50443cb50/recording/7f424df4-65b7-4fe7-ab3a-ea2ae87064c6
 */

const sinon = require('sinon');
const chai = require('chai');
const service = require('../../../services/registerService');
const registerController = require('../../../controllers/registerController');
const { createToken } = require('../../../utils/jwtUtils');

describe('controllers/registerController', () => {
  beforeEach(sinon.restore);
  it('Retorna status code 409 e json com message', async () => {
    
    const status = sinon.stub().callsFake(() => res);
    const json = sinon.stub().returns();
    const res = {status, json};

    sinon.stub(service, 'register').resolves({code: 409, message: 'Usuário existe!'});

    await registerController.register({},res);
    chai.expect(res.status.getCall(0).args[0]).to.be.equal(409);
    chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal({message: 'Usuário existe!'})
  });

  it('Rotorna status code 201 e um objeto com data e token', async () => {
    const status = sinon.stub().callsFake(() => res);
    const json = sinon.stub().returns();
    
    const res = {status, json};

    const data = {
      id: 1,
      name: 'Teste',
      email: 'test@deliveryapp.com',
      password: '12134',
      role: 'customer'
    };


    sinon.stub(service, 'register').resolves({data, code: 201, token: createToken(1)});

    await registerController.register({}, res);

    chai.expect(res.status.getCall(0).args[0]).to.be.equal(201);
    chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal({...data, token: createToken(1)})
  });
});