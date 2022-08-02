const jwt = require("jsonwebtoken");


const generateJWT = (user = {}) => {
  return new Promise((resolve, reject) => {
    const payload = { user };

    // JSON Web Token signature
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
      // Signing Callback
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Unable to generate JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
