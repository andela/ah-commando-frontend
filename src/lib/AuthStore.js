/* istanbul ignore file */
import jwt from 'jsonwebtoken';
import Cryptr from 'cryptr';

export default class AuthStore {
  static TOKEN_NAME = 'haven';

  static SECRET_KEY = 'later make the secret key something better';

  static JWT_ERROR = 'JsonWebTokenError';

  static TOKEN_EXPIRED = 'TokenExpiredError';

  static isSignedIn() {
    let isSigned;
    jwt.verify(this.getToken(), this.SECRET_KEY, (err) => {
      // eslint-disable-next-line no-unused-expressions
      (err && (err.name === this.JWT_ERROR || err.name === this.TOKEN_EXPIRED))
        ? (isSigned = false)
        : (isSigned = true);
    });
    return isSigned;
  }

  static getToken() {
    // return localStorage.getItem(this.TOKEN_NAME);
    return false;
  }

  static decryptQuery(string) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);
    const decryptedQuery = cryptr.decrypt(string);
    return decryptedQuery;
  }
}
