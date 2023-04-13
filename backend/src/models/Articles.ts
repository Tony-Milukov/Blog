const pool = require('./db');
const messages = require('../messages.json');

class Articles {
  static categories = ['programming', 'lifestyle', 'family', 'management', 'Travel', 'Work'];

  static async newArticle(artycleType: string, owner: string, articleValue: string, title: string, cathegory: string) {
    let sql = '';
    try {
      if (artycleType === 'text') {
        sql = 'INSERT INTO `text_article`(`text`, `date_created`, `owner`, `category`, `title`) VALUES (?,?,?,?,?)';
        const dateCreated = new Date().toJSON();
        const [res] = await pool.query(sql, [articleValue, dateCreated, owner, cathegory, title]);
        return { ...messages.newArticleAdded, articleId: res.insertId };
      }
      return messages.default;
    } catch (e) {
      console.error(e);
      return messages.default;
    }
  }

  static async getArticleById(id: number) {
    const sql = 'SELECT * FROM `text_article` WHERE id = ?';
    try {
      const [article] = await pool.query(sql, [id]);
      if (Object.keys(article).length >= 1) {
        return article[0];
      }
      return messages.articleNotFound;
    } catch (e) {
      console.log(e);
      return messages.default;
    }
  }

  static async getArticleByUsername(username: string) {
    const sql = 'SELECT * FROM `text_article` WHERE owner = ?';
    try {
      const [article] = await pool.query(sql, [username]);
      if (Object.keys(article).length >= 1) {
        return article;
      }
      return messages.userArticlesNotFound;
    } catch (e) {
      console.log(e);
      return messages.default;
    }
  }

  static async addComment(articleId: string, commentValue: string, owner: string) {
    const sql = 'INSERT INTO `comments`(`comment_value`, `date_created`, `owner`, `article_id`) VALUES (?,?,?,?)';
    try {
      const dateCreated = new Date().toJSON();
      await pool.query(sql, [commentValue, dateCreated, owner, articleId]);
      return messages.commentAdded;
    } catch (e) {
      console.log(e);
      return messages.default;
    }
  }

  static async getCommentByArticleId(articleId: number) {
    const sql = 'SELECT * FROM `comments` WHERE `article_id` = ?';
    try {
      const [comment] = await pool.query(sql, [articleId]);
      if (Object.keys(comment).length >= 1) {
        return comment;
      }
      return messages.commentErr;
    } catch (e) {
      console.log(e);
      return messages.default;
    }
  }

  static async searchArticle(title: string) {
    const sql = 'SELECT * FROM `text_article` WHERE `title` LIKE ?';
    try {
      const [data] = await pool.query(sql, [`%${title}%`]);
      return data.map((i: any) => ({
        title: i.title,
        articleId: i.id,
        type: 'article',
      }));
    } catch (e) {
      console.error(e);
      return messages.default;
    }
  }

  static async getArticleByCathegory(cathegory: string) {
    const sql = 'SELECT * FROM `text_article` WHERE `category` = ?';
    try {
      if (this.categories.includes(cathegory)) {
        const [data] = await pool.query(sql, [cathegory]);
        if (data.length >= 1) {
          return data;
        }
        return messages.nothingFoundCathegory;
      }
      return messages.cathegoryNotExist;
    } catch (e) {
      console.error(e);
      return messages.default;
    }
  }

  static async getAllArticlesByPage(page: number) {
    const sql = 'SELECT * FROM text_article LIMIT 5 OFFSET ?';
    try {
      const [data] = await pool.query(sql, [page === 1 ? page : page * 5 - 4]);
      if (data.length >= 1) {
        return data;
      }
      return messages.pageEmpty;
    } catch (e) {
      console.error(e);
      return messages.default;
    }
  }

  static async getHomePageArticles() {
    const choosedCats :any = [];
    try {
      const getRandomCatgs = async () => {
        const category = this.categories[Math.floor(Math.random() * this.categories.length)];
        (await this.getArticleByCathegory(category)).status || choosedCats.includes(category) ? await getRandomCatgs() : choosedCats.push(category);
      };
      while (choosedCats.length <= 2) {
        await getRandomCatgs();
      }
      const articles = choosedCats.map(async (cat:any) => {
        const catArticles = await this.getArticleByCathegory(cat);
        return await catArticles[Math.floor(Math.random() * catArticles.length)];
      });

      return await Promise.all(articles);
    } catch (e) {
      console.error(e);
      return messages.default;
    }
  }
}

module.exports = Articles;
export {};
