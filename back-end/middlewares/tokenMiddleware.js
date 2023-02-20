const { validateToken } = require('../src/utils/jwtUtils');

function tokenMiddleware(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error('Token not found');
    const info = validateToken(authorization);
    req.headers.authorization = info;
  
    next();
  } catch (e) {
    return res.status(401).json({ message: e.message });
  }
}

module.exports = tokenMiddleware;
