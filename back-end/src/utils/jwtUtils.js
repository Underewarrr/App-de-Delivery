require('dotenv/config');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const secret = fs
  .readFileSync(path.join(__dirname, '../../jwt.evaluation.key'), { encoding: 'utf-8' });

function createToken(data) {
  const token = jwt.sign({ data }, secret, {
    expiresIn: '300h',
  });

  return token;
}

function validateToken(token) {
  try {
    const { data } = jwt.verify(token, secret);
    return data;
  } catch (e) {
    throw new Error('Expired or invalid token');
  }
}

module.exports = { createToken, validateToken };
