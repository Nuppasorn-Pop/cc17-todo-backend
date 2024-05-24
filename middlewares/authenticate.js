const customError = require("../utils/customerError");
const jwt = require("jsonwebtoken");
const prisma = require("../model/db");
module.exports = async (req, res, next) => {
  try {
    // 1. chcek req.headers -- have Authorization key
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw customError("UnAuthorization", 401);
    }

    // 2. chcek req.headers -- have Bearer value
    // if (!authorization.startsWith("Bearer "))
    if (!/^Bearer /.test(authorization)) {
      throw customError("UnAuthorization", 401);
    }

    // 3. check ว่ามี token นี้ไหมใน Database : jwt.verify
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);

    // 4. use payload find user in prisma.user
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    delete user.password;
    console.log(user);
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
