const userBasicInfo = {
  name: "Fulana Pereira",
  role: "seller",
  email: "fulana@deliveryapp.com",
}

const dbUserInfo = {
  ...userBasicInfo,
  password: '2801c0b66abaf80bf2aa477b8210885e'
}

const serviceLoginReturn = {
  data: {
    ...userBasicInfo,
  },
  token: "token-falso",
  code: 200,
};

const loginReturn = {
  ...userBasicInfo,
  token: "token-falso",
};

const errorLoginReturn = { code: 401, message: "Email ou senha incorretas" };

const userEmailNotFoundError = { code: 404, message: "Cliente não encontrado!" };

const sellersArray = [{ id: 2, name: dbUserInfo.name }];

module.exports = { serviceLoginReturn, loginReturn, errorLoginReturn, userEmailNotFoundError, dbUserInfo, sellersArray };
