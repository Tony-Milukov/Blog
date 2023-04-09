import { first } from 'cheerio/lib/api/traversing';

const bcrypt = require('bcrypt');
const hashPassword = require('../Auth/hashThePassword');
const { decodeUser, getToken } = require('../Auth/decodeUser');
const messages = require('../messages.json');
const signToken = require('../Auth/signToken');

const pool = require('../models/db');

class Users {
  static async getUserByEmail(email: string, getOnlyUsername: boolean = false) {
    const conn = await pool.getConnection();
    try {
      const sql = 'SELECT * FROM `users` WHERE `email` = ?';
      const [data] = await conn.query(sql, [email]);

      if (data.length === 1) {
        if (getOnlyUsername) {
          return data[0].username;
        }
        return data;
      }
      return false;
    } catch (err) {
      console.error(err);
    } finally {
      conn.release();
    }
  }

  static async getUserByUsername(username: string, getUserProfile:boolean = false) {
    const conn = await pool.getConnection();
    try {
      const sql = 'SELECT * FROM `users` WHERE `username` = ?';
      const [data] = await conn.query(sql, [username]);
      if (data.length === 1) {
        if (getUserProfile) {
          delete data[0].id;
          delete data[0].password;
          delete data[0].firstname;
          delete data[0].lastname;
          return data[0];
        }
        return data[0];
      }
      return messages.userNotDefned;
    } catch (err) {
      console.error(err);
    } finally {
      conn.release();
    }
  }

  static async generateUserTokenByEmailAndPassword(email: string, password: string, req: any) {
    try {
      try {
        if (await decodeUser(req)) {
          return getToken(req);
        }
        if (email && password) {
          const user = await this.getUserByEmail(email);
          if (user.length === 1) {
            const expectedPassword = user[0].password;
            if (bcrypt.compareSync(password, expectedPassword)) {
              const userToken = signToken(email);
              return userToken;
            }
          }
          return messages.loginError;
        }
        return messages.loginError;
      } catch (e) {
        console.log(e);
        throw null;
      }
    } catch (e) {
      console.log(e);
      return messages.loginError;
    }
  }

  static async registerUser(email: string, password: string, username: string) {
    const hash = await hashPassword(password);
    const conn = await pool.getConnection();
    try {
      const doesUsernameExist = await this.getUserByUsername(username);
      const doesEmailExist = await this.getUserByEmail(email);
      if (!doesEmailExist && !doesUsernameExist) {
        const sql = 'INSERT INTO `users`(`email`, `password`,`username`) VALUES (?,?,?)';
        conn.query(sql, [email, hash, username]);
        return messages.userAdded;
      }
      return {
        emailErr: doesEmailExist ? messages.emailExists : null,
        usernameErr: doesUsernameExist ? messages.userExists : null,
      };
    } catch (e) {
      return messages.default;
    } finally {
      conn.release();
    }
  }

  static async changeUserData(newData: string, email: string, changeType: string) {
    const conn = await pool.getConnection();
    const sql = changeType === 'job' ? 'UPDATE users SET job = ? WHERE email = ?' : changeType === 'github_link' ? 'UPDATE users SET github_link = ? WHERE email = ?' : changeType === 'instagram_link' ? 'UPDATE users SET instagram_link = ? WHERE email = ?' : changeType === 'firstname' ? 'UPDATE users SET firstname = ? WHERE email = ?' : changeType === 'lastname' ? 'UPDATE users SET lastname = ? WHERE email = ?' : changeType === 'description' ? 'UPDATE users SET description = ? WHERE email = ?' : '';
    try {
      if (changeType === 'github_link' && newData && !newData.includes('https://github.com/')) {
        return messages.gitHubInvalid;
      }
      if (changeType === 'instagram_link' && newData && !newData.includes('https://www.instagram.com/')) {
        return messages.instagramInvalid;
      }
      if (await this.getUserByEmail(email) && sql !== '') {
        await conn.query(sql, [newData, email]);
        return { ...messages.userDataChanged, message: `${changeType} ${messages.userDataChanged.message}` };
      }
      throw null;
    } catch (err) {
      console.error(err);
      return messages.default;
    } finally {
      conn.release();
    }
  }
}

module.exports = Users;
export {};
