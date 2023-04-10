const messages = require('../messages.json');
const Users = require('../models/Users');
const Articles = require('../models/Articles');

const search = async (req:any, res:any) => {
  const { searchValue } = req.body;
  try {
    if (searchValue) {
      const matched = [];
      const usersMatched = await Users.searchUser(searchValue);
      const articlesMatched = await Articles.searchArticle(searchValue);
      matched.push(...usersMatched, ...articlesMatched);
      res.json(matched);
    } else {
      throw 'searchValue err';
    }
  } catch (e) {
    console.error(e);
    res.status(messages.default.status).send(messages.default);
  }
};
export {
  search,
};
