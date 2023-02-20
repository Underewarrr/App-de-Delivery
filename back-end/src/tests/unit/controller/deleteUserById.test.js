const chai = require('chai');
const sinon = require('sinon');
const admin = require('../../../controllers/deleteUser');
const service = require('../../../services/deleteUser');

describe('controllers/deleteUser', () => {
  beforeEach(sinon.restore);
  
  it('Dever retornar status code 204', async () => {
  const data = 1;
  const id = '1';

  const status = sinon.stub().callsFake(() => res);
  const json = sinon.stub().returns();

  const res = {status, json};

  /* const params = sinon.stub().callsFake(() => req);
  const req = {id, params}; */

  const req = {
    params: {
      id,
    }
  }
    sinon.stub(service, 'deleteUser').resolves({data, code: 204});

    await admin.deleteUser(req, res);

    chai.expect(status.getCall(0).args[0]).to.be.equal(204);
  });
});
