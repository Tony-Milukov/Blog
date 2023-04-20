const express = require('express');
const bodyParser = require('body-parser');
const path = require("path")
const fileUpload = require("express-fileupload")

const {
    loginUser, registerUser, getUser, changeUserData, getUserProfileByUsername,
    getAvatar,
    updateAvatar
} = require('../controllers/userController');
const passport = require('../Auth/passport');

const router = express.Router();

router.use(fileUpload({}))
router.use(bodyParser.json());
router.post('/login', loginUser);
router.put('/register', registerUser);
router.post('/getUser', passport.authenticate('jwt', {session: false}), getUser);
router.put('/changeUser', passport.authenticate('jwt', {session: false}), changeUserData);
router.post('/getUserProfile', getUserProfileByUsername);
router.put("/avatar", updateAvatar)
router.post("/avatar",getAvatar)
module.exports = router;

export {};
