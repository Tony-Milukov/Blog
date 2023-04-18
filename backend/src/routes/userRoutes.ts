const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')
const path = require("path")
const {
    loginUser, registerUser, getUser, changeUserData, getUserProfileByUsername,
    getProfilePictureFile,
    updateUserPicture
} = require('../controllers/userController');
const passport = require('../Auth/passport');
const storage = multer.diskStorage({
    destination:  function (req:any, file:any, cb:any) {
        cb(null, 'profilePictures/')
    },
    filename: function (req:any, file:any, cb:any) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalExtension = path.extname(file.originalname);
        const filename = file.fieldname + '-' + uniqueSuffix + originalExtension;
        cb(null, filename);
    }
});
const upload = multer({storage: storage});


const router = express.Router();
router.use(bodyParser.json());

router.post('/login', loginUser);
router.put('/register', registerUser);
router.post('/getUser', passport.authenticate('jwt', {session: false}), getUser);
router.put('/changeUser', passport.authenticate('jwt', {session: false}), changeUserData);
router.post('/getUserProfile', getUserProfileByUsername);
router.put("/updateUserPicture", upload.single('profilePic'),updateUserPicture)
router.post("/getProfilePicture",getProfilePictureFile)
module.exports = router;

export {};
