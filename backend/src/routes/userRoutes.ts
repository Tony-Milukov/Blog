const express = require('express');
const bodyParser = require('body-parser');
const {
  loginUser, registerUser, getUser, changeUserData, getUserProfileByUsername} = require('../controllers/userController');
const passport = require('../Auth/passport');

const router = express.Router();
router.use(bodyParser.json());

router.post('/login', loginUser);
router.put('/register', registerUser);
router.post('/getUser', passport.authenticate('jwt', { session: false }), getUser);
router.put('/changeUser', passport.authenticate('jwt', { session: false }), changeUserData);
router.post('/getUserProfile', getUserProfileByUsername);

module.exports = router;

export {};
