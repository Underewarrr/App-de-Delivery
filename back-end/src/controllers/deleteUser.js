const service = require('../services/deleteUser');

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const { code } = await service.deleteUser(parseInt(id, 10));

  return res.status(code).json();
};

module.exports = { deleteUser };