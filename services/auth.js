const jwt = require("jsonwebtoken");

const secret = "Pr@dip$123%";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };
  const token = jwt.sign(payload, secret);
  return token;
}

function validateToken(token) {
  if (!token) return null;
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (err) {
    console.log("JWT verification error: ", err.message);
    return null;
  }
}

module.exports = {
  createTokenForUser,
  validateToken,
};
