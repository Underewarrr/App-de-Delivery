const md5 = require('md5');
const { createToken } = require('../utils/jwtUtils');
const models = require('../database/models');

const administrator = async (param) => {
  const { name, email, password, role } = param;
  
  let data = await models.User.findOne({ where: { email } });

if (data) {
  return { code: 409, message: 'Usuário existe!' };
}

const token = createToken(role);

const md5Password = md5(password);
const { dataValues } = await models
.User.create({ name, email, password: md5Password, role });
data = dataValues;

data = dataValues;

return { data, code: 201, token };
};

module.exports = { administrator };