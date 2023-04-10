const express = require('express');
const bodyParser = require('body-parser');
const passport = require('../Auth/passport');
const {
  newArticle, getArticleById, getArticleByUsername, addComment, getCommentByArticleId,
  getArticleByCathegory,
} = require('../controllers/ArticleController');

const router = express.Router();
router.use(bodyParser.json());

router.put('/newArticle', passport.authenticate('jwt', { session: false }), newArticle);
router.post('/getArticleById', getArticleById);
router.post('/getArticleByUsername', getArticleByUsername);
router.put('/addComment', passport.authenticate('jwt', { session: false }), addComment);
router.post('/getCommentsByArticleId', getCommentByArticleId);
router.post('/getArticleByCathegory', getArticleByCathegory);

module.exports = router;
export {};
