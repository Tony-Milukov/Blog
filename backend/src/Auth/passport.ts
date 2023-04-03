const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../models/Users');

const { Strategy, ExtractJwt } = passportJWT;
process.env.SECRET = 'c59#@5kr6P4_qD}P5LuR7t=1q_aZ';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};
const jwtCallback = (jwtPayload:any, done:any) => {
  User.generateUserTokenByEmailAndPassword(jwtPayload.email, jwtPayload.password)
    .then((user: any) => done(null, user))
    .catch((err: any) => done(err));
};
passport.use(new Strategy(options, jwtCallback));
module.exports = passport;
export {};
