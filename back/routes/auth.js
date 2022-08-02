const express = require("express");
const router = express.Router();
const {getUsers,signUp, logIn} = require("../controllers/auth");
const {signupValidator,loginValidator, checkValidator} = require("../middlewares/userValidate");

router.get("/", getUsers)
router.post("/signUp",signupValidator, checkValidator, signUp)
router.post("/logIn",loginValidator, checkValidator, logIn)

module.exports = router;