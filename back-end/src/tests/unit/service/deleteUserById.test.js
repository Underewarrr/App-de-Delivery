const chai = require('chai');
const sinon = require('sinon');
const models = require('../../../database/models');
const { deleteUser } = require('../../../services/deleteUser');

describe('services/deleteUser', () => {
  beforeEach(sinon.restore);
  it('Deve retornar um objeto com e code 204', async () => {
    const id = 2;
    const data = 1;
    sinon.stub(models.User, 'destroy').resolves(data);
    const response = await deleteUser(id);
    chai.expect(response).to.be.deep.equal({data, code: 204})
  });
});