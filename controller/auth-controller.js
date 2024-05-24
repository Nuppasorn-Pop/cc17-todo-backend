// controller พวกที่เป็น async เราต้อง throw error ออกมาเอง
// แต่ sync มันไป error ที่ Middleware Error ที่เราสร้างขึ้นมา
// ตัวอย่าง throw error
// let x = 5;
// if (x > 3) {
//   throw new Error("error, x>3");
// }
const prisma = require("../model/db");
const customerError = require("../utils/customerError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tryCatch = require("../utils/tryCatch");

const register = tryCatch(async (req, res, next) => {
  // req.body ==> {username, password, confirmPassword, email} ส่งมาในรูปแบบ Array buffer (ภายใน Array เป็น String)

  const { username, password, confirmPassword, email } = req.body;
  // 1. Validation
  if (!(username && password && confirmPassword)) {
    // ---------- ย้ายไปเขียนใน utils --------------------------
    // const error = new Error("Fill all Input");
    // error.stattusCode = 400;
    // return next(error); //เขียนแบบ 1 : โยน error ไปให้ Error Middleware
    // -------------------------------------------------------
    throw customerError("Fill all Input", 400);
    // return next(customerError("Fill all Input", 400));
  }

  if (password !== confirmPassword) {
    // ---------- ย้ายไปเขียนใน utils --------------------------
    // const error = new Error("Check confirmPassword");
    // err.stattusCode = 400;
    // throw (error); //เขียนแบบ 2 : โยน error ไปให้ Error Middleware
    // -------------------------------------------------------
    throw customerError("Fill all Input", 400);
  }

  // 2. check username exists
  const userExists = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (userExists) {
    throw customerError("username already exists", 400);
  }

  // 3. hash password => bcrypt
  const hashedPassword = await bcrypt.hash(password, 8);
  const data = {
    username: username,
    password: hashedPassword,
    email: email,
  };

  // 4. create user : prisma.user.create
  const result = await prisma.user.create({
    data: data,
  });
  console.log(result);
  res.json({ massage: "Register Successful" });
  // res.json({message : "in rigister", data: data})
});

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // 1. Validate
    if (!username || !password) {
      return next(customerError("Fill all Input", 400));
    }

    // 2. find username : prisma.user.find
    const targetUser = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!targetUser) {
      throw customerError("Invalid login", 404);
    }

    // 3. check password
    const checkPassowrd = await bcrypt.compare(password, targetUser.password);
    if (!checkPassowrd) {
      throw customerError("Invalid login", 404);
    }
    // 4. create jwt-token
    // 4.1. make payload = {id,username}
    // jwt.sign + {expiresIn : '7d'}
    // response jwt-token
    const payload = { id: targetUser.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log(token);
    res.json({ token: token });
  } catch (err) {
    next(err);
  }

  res.json({ message: "In login" });
};

const me = (req, res, next) => {
  res.json({ message: "In getMe" });
};

module.exports = {
  register,
  login,
  me,
};
