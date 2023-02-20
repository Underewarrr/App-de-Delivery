const models = require('../database/models');

const deleteUser = async (id) => {
  const data = await models.User.destroy({ where: { id } });
  return { data, code: 204 };
};

module.exports = { deleteUser };