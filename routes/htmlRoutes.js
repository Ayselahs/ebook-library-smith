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

router.get("/library", async (req, res) => {
  const isLoggedIn = req.session.isLoggedIn
  console.log(req.session.isLoggedIn)
  if (!(isLoggedIn)) return res.redirect("/");
  console.log('Session', isLoggedIn)
  res.render("library", { isLoggedIn });
});

router.get("/explore", checkAuth, async (req, res) => {
  const isLoggedIn = req.session.isLoggedIn
  console.log(req.session.isLoggedIn)
  if (!(isLoggedIn)) return res.redirect("/");
  const { databaseInfo } = await controllers.explore.viewBooks()
  res.render("explore", { checkAuth: true, databaseInfo })


})
/*router.get("/explore", async (req, res) => {
  const isLoggedIn = req.session.isLoggedIn
  if (!(isLoggedIn)) return res.redirect("/");
  console.log('Session', isLoggedIn)
  res.render("explore", { isLoggedIn });
});*/






module.exports = router;
