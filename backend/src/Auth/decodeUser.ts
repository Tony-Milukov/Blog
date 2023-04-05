const jwt = require('jsonwebtoken');

const getToken = (req:any) => {
  if (req.headers.authorization !== undefined) {
    const token = req.headers.authorization.replace('Bearer ', '');
    return token;
  }
  return false;
};
// eslint-disable-next-line consistent-return
const decodeUser = async (req:any) => {
  try {
    const token = getToken(req);
    const { email } = jwt.verify(token, process.env.SECRET);
    return email;
  } catch {}
};
module.exports = { decodeUser, getToken };

export {};
