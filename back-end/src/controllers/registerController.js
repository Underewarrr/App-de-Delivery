const service = require('../services/registerService');

const register = async (req, res, _next) => {
  const { body } = req;
  const { data, message, code, token } = await service.register(body);

  if (!data) {
    return res.status(code).json({ message });
  }

  return res.status(code).json({ ...data, token });
};

module.exports = { register };
