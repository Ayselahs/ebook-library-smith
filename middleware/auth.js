module.exports = function (req, res, next) {
  if (req.session.isLoggedIn) {
    console.log('Session User', req.session.isLoggedIn)
    return next();

  }
  res.redirect("/login");
};

