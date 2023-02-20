function verifyPassword(reqPassword, dbPassword) {
  if (reqPassword === dbPassword) {
    return true;
  }
  return false;
}

module.exports = verifyPassword;
