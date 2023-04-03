const express = require('express');
const bodyParser = require('body-parser');
const {loginUser, registerUser, getUser, changeUserInfo} = require('../controllers/userController');
const passport = require('../Auth/passport');

const router = express.Router();
router.use(bodyParser.json());

router.post('/login', loginUser);
router.put('/register', registerUser);
router.post('/getUser', passport.authenticate('jwt', { session: false }), getUser);
router.put('/changeUser', passport.authenticate('jwt', { session: false }), changeUserInfo);

module.exports = router;

export {};
