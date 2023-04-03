const jwt = require('jsonwebtoken');

module.exports = (email:string) => jwt.sign({ email }, process.env.SECRET, { expiresIn: '3h' });
export {}
