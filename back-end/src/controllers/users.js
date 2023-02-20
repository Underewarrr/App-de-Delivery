const userService = require('../services/users');

async function login(req, res) {
    const { data, token, message, code } = await userService.login(req.body);
    if (!data) {
      return res.status(code).json({ message });
    }
    const { name, role, email } = data;
    return res.status(code).json({ name, role, email, token });
}

async function getSellers(_req, res) {
  const { data, code } = await userService.getSellers();
  return res.status(code).json(data);
}

module.exports = { login, getSellers };