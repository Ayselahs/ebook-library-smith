const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

router.get("/", ({ session: { isLoggedIn } }, res) => {
  console.log('Entered index')
  res.render("index", {});
});

router.get("/login", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/library");
  res.render("login", { error: req.query.error });
});

router.get("/signup", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("signup", { error: req.query.error });
});

router.get("/private", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("protected", { isLoggedIn });
});

// Library
router.get("/library", checkAuth, controllers.library.get)
router.post("/library/delete/:bookId", checkAuth, controllers.library.remove)

// Explore
router.get("/explore", checkAuth, controllers.explore.viewBooks)
router.get("/explore/search", controllers.explore.searchFun)
router.post("/explore/add", checkAuth, controllers.explore.addingLibrary)







module.exports = router;
