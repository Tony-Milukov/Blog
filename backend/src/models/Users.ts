const bcrypt = require('bcrypt');
const hashPassword = require('../Auth/hashThePassword');
const { decodeUser, getToken } = require('../Auth/decodeUser');
const messages = require('../messages.json');
const signToken = require('../Auth/signToken');
const fs = require('fs');

const pool = require('../models/db');

class Users {
  static async getUserByEmail(email: string) {
    try {
      const sql = 'SELECT * FROM `users` WHERE `email` = ?';
      const [data] = await pool.query(sql, [email]);

      if (data.length === 1) {
        return data;
      }
      return false;
    } catch (err) {
      console.error(err);
    }
  }

  static async getUsernameByEmail(email : string) {
    try {
      const user = await this.getUserByEmail(email);
      return user[0] ? user[0].username : false;
    } catch (err) {
      console.error(err);
    }
  }

  static async getUserByUsername(username: string) {
    try {
      const sql = 'SELECT * FROM `users` WHERE `username` = ?';
      const [data] = await pool.query(sql, [username]);
      if (data.length >= 1) {
        return data[0];
      }
      return messages.userNotDefned;
    } catch (err) {
      console.error(err);
    }
  }

  static async getUserProfile(username: string) {
    try {
      const sql = 'SELECT * FROM `users` WHERE `username` = ?';
      const [data] = await pool.query(sql, [username]);
      if (data.length >= 1) {
        delete data[0].id;
        delete data[0].password;
        delete data[0].firstname;
        delete data[0].lastname;
        return data[0];
      }
      return messages.userNotDefned;
    } catch (err) {
      console.error(err);
    }
  }

  static async generateUserTokenByEmailAndPassword(email: string, password: string, req: any) {
    try {
      try {
        if (email && password) {
          // if token is active we return token to user, else we generate new token for the user
          const isTokenActive = await decodeUser(req) ? await this.getUsernameByEmail(await decodeUser(req)) : false;
          if (isTokenActive) {
            return await getToken(req);
          }
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
    try {
      const doesUsernameExist = (await this.getUserByUsername(username)).username ?? null;
      const doesEmailExist = await this.getUserByEmail(email);
      if (!doesEmailExist && !doesUsernameExist) {
        const sql = 'INSERT INTO `users`(`email`, `password`,`username`,`profile_pic_path`) VALUES (?,?,?,"default.jpg")';
        pool.query(sql, [email, hash, username]);
        return messages.userAdded;
      }
      return {
        emailErr: doesEmailExist ? messages.emailExists : null,
        usernameErr: doesUsernameExist ? messages.userExists : null,
      };
    } catch (e) {
      return messages.default;
    }
  }

  static async changeUserData(newData: string, email: string, changeType: string) {
    const sql = changeType === 'job' ? 'UPDATE users SET job = ? WHERE email = ?' : changeType === 'github_link' ? 'UPDATE users SET github_link = ? WHERE email = ?' : changeType === 'instagram_link' ? 'UPDATE users SET instagram_link = ? WHERE email = ?' : changeType === 'firstname' ? 'UPDATE users SET firstname = ? WHERE email = ?' : changeType === 'lastname' ? 'UPDATE users SET lastname = ? WHERE email = ?' : changeType === 'description' ? 'UPDATE users SET description = ? WHERE email = ?' : '';
    try {
      if (changeType === 'github_link' && newData && !newData.includes('https://github.com/')) {
        return messages.gitHubInvalid;
      }
      if (changeType === 'instagram_link' && newData && !newData.includes('https://www.instagram.com/')) {
        return messages.instagramInvalid;
      }
      if (await this.getUserByEmail(email) && sql !== '') {
        await pool.query(sql, [newData, email]);
        return { ...messages.userDataChanged, message: `${changeType} ${messages.userDataChanged.message}` };
      }
      throw null;
    } catch (err) {
      console.error(err);
      return messages.default;
    }
  }

  static async searchUser(username:string) {
    const sql = 'SELECT * FROM `users` WHERE `username` LIKE ?';
    try {
      const [data] = await pool.query(sql, [`%${username}%`]);
      return data.map((i:any) => ({
        username: i.username,
        type: 'user',
      }));
    } catch (e) {
      console.error(e);
    }
  }
  static async getProfilePicturePathByEmail(email:string) {
    const sql = 'SELECT `profile_pic_path` FROM `users` WHERE `email` = ?';
    try {
      const [data] = await pool.query(sql, [email]);
      const profilePicPath = data[0].profile_pic_path
      if(profilePicPath) {
        return profilePicPath;
      } else {
        throw new Error("ERROR")
      }
    } catch (e) {
      console.error(e);
    }
  }

  static async getProfilePictureFile(email:string) {
    try {
        const picturePath  = await this.getProfilePicturePathByEmail(email);
        console.log(picturePath)
     const picture =  await fs.promises.readFile(`profilePictures/${picturePath}`);
     return picture
    } catch (e) {
      return messages.default;
      console.error(e);
    }
  }
  static async updateUserPicture(filename:string,email:string) {
    const sql = 'UPDATE `users` SET `profile_pic_path`= ? where email = ?';
    try {
      //get old path to delete it
      const oldPicturePath =
          //if this is not default image
          await this.getProfilePicturePathByEmail(email) !== "default.jpg"
          ? `profilePictures/${await this.getProfilePicturePathByEmail(email)}` : false

      //if this is  default image then, delete
      if(oldPicturePath) {
        fs.unlink(oldPicturePath, (err:any) => err ? console.error(err) : null);
      }
      const [data] = await pool.query(sql, [filename,email]);
      if(data) {
        return filename;
      } else {
        throw new Error("ERROR")
      }
    } catch (e) {
      console.error(e);
      return messages.default;
    }
  }

}

module.exports = Users;
export {};


