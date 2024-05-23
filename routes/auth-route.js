const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller");
//Detrusturing (เขียนแบบไหนก็ได้)=> const {register, login, me} = require("../controller/auth-controller");

// POST /auth/register
router.post("/register", authController.register);
// POST /auth/login
router.post("/login", authController.login);
// GET  /auth/me
router.get("/me", authController.me);

module.exports = router;
