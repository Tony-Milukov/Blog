const { decodeUser } = require('../Auth/decodeUser');
const Users = require('../models/Users');
const messages = require('../messages.json');

const loginUser = async (req:any, res:any) => {
  const { email, password } = req.body;
  try {
    if (email !== undefined && password !== undefined) {
      const userToken = await Users.generateUserTokenByEmailAndPassword(email, password, req);
      if (!userToken.message) {
        res.json({ token: userToken });
      } else {
        res.status(userToken.status).json(userToken);
      }
    } else {
      throw null;
    }
  } catch {
    res.status(messages.default.status).json(messages.default);
  }
};

const registerUser = async (req:any, res:any) => {
  const { email, name, password } = req.body;

  try {
    if (email !== undefined && password !== undefined && name !== undefined) {
      const message = await Users.registerUser(email, password, name);
      res.status(message.status ?? 303).json(message);
    } else {
      throw null;
    }
  } catch {
    res.status(messages.default.status).json(messages.default);
  }
};
const getUser = async (req:any, res:any) => {
  try {
    const email = await decodeUser(req);
    const [user] = await Users.getUserByEmail(email);
    delete user.password;
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(messages.default.status).json(messages.default);
  }
};
const changeUserInfo = async (req:any, res:any) => {
  try {
    const { changeType, name } = req.body;
    const email = await decodeUser(req);
    if (changeType === 'lastname' || changeType === 'firstname' || changeType === 'github_link' || changeType === 'instagram_link') {
      const message = await Users.changeUserInfo(name, email, changeType);
      res.status(message.status).send(message);
    } else {
      throw null;
    }
  } catch (e) {
    console.error(e);
    res.status(messages.default.status).json(messages.default);
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUser,
  changeUserInfo,
};

export {};
