const router = require("express").Router();
const { default: axios } = require("axios");
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");
const { Explore } = require("../models");



// admin login/logout
router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);





module.exports = router;
