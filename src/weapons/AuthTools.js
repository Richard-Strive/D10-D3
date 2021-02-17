const jwt = require("jsonwebtoken");
const UserSchema = require("../routes/schema");

const generateJWT = (payload) => {
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1 week" },
      (err, decoded) => {
        if (err) rej(err);
        res(token);
      }
    )
  );
};

const verifyJWT = (token) =>
  new Promise((res, rej) =>
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      { expiresIn: "1 week" },
      (err, decoded) => {
        if (err) rej(err);
        res(decoded);
      }
    )
  );

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const deconde = await verifyJWT(token);

    const user = await UserSchema.findOne({ _id: deconde._id });

    if (!user) throw new Error("NO USERS HERE PROBABLY YOU DON'T HAVE A TOKEN");

    req.tokeeeeen = token;
    req.user = user;
    next();
    console.log(header);
  } catch (error) {
    console.log(error);
    error.httpStatusCode = 401;
    next(error);
    throw new Error("SOMETHING WENT LOKEN");
  }
};

module.exports = { authenticate, verifyJWT, generateJWT };
