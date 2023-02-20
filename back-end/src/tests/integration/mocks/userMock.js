const userRoleEmailName = {
  name: "Fulana Pereira",
  role: "seller",
  email: "fulana@deliveryapp.com",
}

const userDbInfo = {
  ...userRoleEmailName,
  id: 1,
  password: '640b0f7c20d2beb052b05123d41c3a4b'
}

const loginSendInfo = {
  email: "fulana@deliveryapp.com",
  password: "senhamuitocomplicada",
}

const returnedLoginInfo = {
  ...userRoleEmailName,
  token: 'token',
}

module.exports = { userDbInfo, loginSendInfo, returnedLoginInfo, userRoleEmailName }
