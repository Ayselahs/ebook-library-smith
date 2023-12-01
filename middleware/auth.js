module.exports = function (req, res, next) {
  if (req.session.isLoggedIn) {
    console.log('Session Object', req.session)
    console.log('Session User', req.session.isLoggedIn)
    req.user = req.session.username
    return next();

  }
  res.redirect("/login");
};

