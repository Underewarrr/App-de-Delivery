const md5 = require('md5');
const { User } = require('../database/models');
const { createToken } = require('../utils/jwtUtils');
const verifyPassword = require('../utils/verifyPassword');

async function login(user) {
  const reqEmail = user.email;
  const data = await User.findOne({ where: { email: reqEmail } });

  if (!data) {
    return { code: 404, message: 'Cliente não encontrado!' };
  }

  const reqPassword = md5(user.password);

  const verify = verifyPassword(reqPassword, data.password);

  if (!verify) {
    return { code: 401, message: 'Email ou senha incorretas' };
  }

  const token = createToken(data.id);

  const { name, role, email } = data;

  const infoObj = { name, role, email };

  return { code: 200, data: infoObj, token };
}

async function getSellers() {
  const sellers = await User.findAll({ where: { role: 'seller' }, attributes: ['id', 'name'] });
  return { code: 200, data: sellers };
}

module.exports = { login, getSellers };
