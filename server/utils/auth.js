const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.REACT_APP_JWT_SECRET;
const expiration = "2h";

module.exports = {
  signToken: function ({ username, _id }) {
    const payload = { username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  verifyToken: function (token) {
    try {
      if (token) {
        const user = jwt.verify(token, secret);
        return user;
      }
      return null;
    } catch (error) {
      return null;
    }
  },
};
