const jwt = require('jsonwebtoken');
require("dotenv").config()

const getToken = (req:any) => {
  if (req && req.headers && req.headers.authorization) {
    const token = req.headers.authorization.replace('Bearer ', '');

    return token;
  }
  return false;
};
const decodeUser = async (req:any) => {
  try {
    if (req) {
      const token = getToken(req);
      if (token) {
        return jwt.verify(token, process.env.SECRET, (err:any, email :any) => {
          if (!err) {
            return email.email;
          }
          return false;
        });
      }
    } return false;
  } catch (e) {
    console.error(e);
  }
};
module.exports = { decodeUser, getToken };

export {};
