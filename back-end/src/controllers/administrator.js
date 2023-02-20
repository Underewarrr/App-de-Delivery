const service = require('../services/administrator');

const administrator = async (req, res) => {
  const { body } = req;
  const { data, message, code, token } = await service.administrator(body);

  if (!data) {
    return res.status(code).json({ message });
  }
  const { name, role, email } = data;
  return res.status(code).json({ name, role, email, token });
};

module.exports = { administrator };