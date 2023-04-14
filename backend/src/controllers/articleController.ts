const { decodeUser } = require('../Auth/decodeUser');
const Users = require('../models/Users');
const Articles = require('../models/Articles');
const messages = require('../messages.json');

const newArticle = async (req : any, res :any) => {
  const {
    articleType, articleValue, title, cathegory,
  } = req.body;
  try {
    if (articleValue && articleType && title && cathegory) {
      const email = await decodeUser(req);
      const username = await Users.getUsernameByEmail(email);

      const message = await Articles.newArticle(articleType, username, articleValue, title, cathegory);
      res.status(message.status ?? 404).send(message);
    } else {
      throw 'no articleType or articleValue or title or cathegory  inputted';
    }
  } catch (e) {
    res.status(messages.default.status).send(messages.default);
    console.error(e);
  }
};
const getArticleById = async (req :any, res:any) => {
  const { id } = req.body;
  try {
    if (id) {
      const article = await Articles.getArticleById(id);
      if (article.status) {
        res.status(article.status).send(article);
      } else {
        res.send(article);
      }
    } else {
      throw 'no id inputted';
    }
  } catch (e) {
    res.send(messages.default);
    console.error(e);
  }
}; const addComment = async (req:any, res:any) => {
  const { articleId, commentValue, owner } = req.body;
  try {
    if (articleId && commentValue && owner) {
      const comment = await Articles.addComment(articleId, commentValue, owner);
      if (comment.status) {
        res.status(comment.status).send(comment);
      } else {
        res.send(comment);
      }
    } else {
      throw 'no id inputted';
    }
  } catch (e) {
    res.send(messages.default);
    console.error(e);
  }
};
const getCommentByArticleId = async (req:any, res:any) => {
  const { articleId } = req.body;

  try {
    if (articleId) {
      const comment = await Articles.getCommentByArticleId(articleId);
      if (comment.status) {
        res.status(comment.status).send(comment);
      } else {
        res.send(comment);
      }
    } else {
      throw 'no articleId inputted';
    }
  } catch (e) {
    res.send(messages.default);
    console.error(e);
  }
};
const getArticleByUsername = async (req:any, res:any) => {
  const { username } = req.body;
  try {
    if (username) {
      const articles = await Articles.getArticleByUsername(username);
      if (articles.status) {
        res.status(articles.status).send(articles);
      } else {
        res.send(articles);
      }
    } else {
      throw 'no username inputted';
    }
  } catch (e) {
    res.send(messages.default);
    console.error(e);
  }
};
const getArticleByCategory = async (req:any, res:any) => {
  const { category } = req.body;
  try {
    if (category) {
      const articles = await Articles.getArticleByCategory(category);
      if (articles.status) {
        res.status(articles.status).send(articles);
      } else {
        res.send(articles);
      }
    } else {
      throw 'no cathegory inputted';
    }
  } catch (e) {
    res.send(messages.default);
    console.error(e);
  }
};
const getAllArticlesByPage = async (req:any, res:any) => {
  const { page } = req.body;
  try {
    if (page) {
      const articles = await Articles.getAllArticlesByPage(page);
      if (articles.status) {
        res.status(articles.status).send(articles);
      } else {
        res.send(articles);
      }
    } else {
      throw 'no cathegory inputted';
    }
  } catch (e) {
    res.send(messages.default);
    console.error(e);
  }
};
const getHomePageArticles = async (req:any, res:any) => {
  try {
    const articles = await Articles.getHomePageArticles();
    if (!articles) {
     throw new Error("error");
    } else {
      res.send(articles);
    }
  } catch (e) {
    res.send(messages.default);
    console.error(e);
  }
};
module.exports = {
  newArticle,
  getArticleById,
  addComment,
  getCommentByArticleId,
  getArticleByUsername,
  getArticleByCategory,
  getAllArticlesByPage,
  getHomePageArticles,
};
export {};
