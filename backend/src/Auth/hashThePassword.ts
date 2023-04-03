const brycpt = require('bcrypt');

const hashThePassword = async (password:string) => {
  const saltRounds = 10;
  const hash = await brycpt.hash(password, saltRounds);
  return hash;
};
module.exports = hashThePassword;
export {};
