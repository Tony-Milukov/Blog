const exspress = require('express');
const bodyParser = require('body-parser');
const { search } = require('../controllers/generalController');

const router = exspress.Router();
router.use(bodyParser.json());
router.post('/search', search);
module.exports = router;
export {};
