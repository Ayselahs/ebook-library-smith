const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

router.get("/", ({ session: { isLoggedIn } }, res) => {
  console.log('Entered index')
  res.render("index", { isLoggedIn });
});

router.get("/login", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("login", { error: req.query.error });
});

router.get("/signup", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("signup", { error: req.query.error });
});

router.get("/private", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("protected", { isLoggedIn });
});

router.get("/library", checkAuth, controllers.library.get)
router.get("/explore", checkAuth, controllers.explore.viewBooks)
router.get("/explore/search", controllers.explore.searchFun)

// Explore


router.post("/explore/add", checkAuth, controllers.explore.addingLibrary)
router.post("/library/delete/:bookId", checkAuth, controllers.library.remove)






module.exports = router;
