const express = require("express");
const router = express.Router();
const {LoginGET,LoginPOST,RegisterPOST} = require("../middalware/userfunc");

router.route("/login").get(LoginGET).post(LoginPOST);
router.route("/register").post(RegisterPOST);


module.exports = router;