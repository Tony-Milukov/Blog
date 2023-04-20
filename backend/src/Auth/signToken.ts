const jwt = require('jsonwebtoken');
require("dotenv").config()

module.exports = (email:string) => jwt.sign({ email }, process.env.SECRET, { expiresIn: '3h' });
export {}
