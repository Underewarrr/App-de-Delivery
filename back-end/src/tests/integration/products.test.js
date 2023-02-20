const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { Product } = require('../../database/models')
const app = require('../../api/app');
const { productsReturn } = require('./mocks/productsMock');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes de integração da rota products', function () {
  afterEach(sinon.restore);
  it('Verifica se ao fazer uma requisição é retornado a rota é retornado todos os produtos', async function () {
    sinon.stub(Product, 'findAll').resolves(productsReturn)
    const chaiResponse = await chai.request(app).get('/products');

    expect(chaiResponse.status).to.be.equal(200)
    expect(chaiResponse.body).to.be.deep.equal({ data: [...productsReturn] })
  })

  it('Verifica se ao fazer uma requisição em que ocorre algum erro no servidor é retornado um code 500', async function () {
    sinon.stub(Product, 'findAll').resolves(null)
    const chaiResponse = await chai.request(app).get('/products');

    expect(chaiResponse.status).to.be.equal(500)
    expect(chaiResponse.body).to.be.deep.equal({ message: 'Erro interno!' })
  })
})
