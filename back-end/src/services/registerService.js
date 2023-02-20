const md5 = require('md5');
const { createToken } = require('../utils/jwtUtils');
const models = require('../database/models');

const register = async (param) => {
  const { name, email, password } = param;
  let data = await models.User.findOne({ where: { email } });

  if (data) {
    return { code: 409, message: 'Usuário existe!' };
  }

  const md5Password = md5(password);

  const { dataValues } = await models.User.create({
    name,
    email,
    password: md5Password,
    role: 'customer',
  });
  data = dataValues;

  const token = createToken(data.id);

  return { data, code: 201, token };
};

module.exports = { register };
