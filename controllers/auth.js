const { User } = require("../models");

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.redirect("/login?error=must include username and password");

    const user = await User.findOne({ username });

    if (!user)
      return res.redirect("/login?error=username or password is incorrect");

    const passwordMatches = await user.checkPassword(password);

    if (!passwordMatches)
      return res.redirect("/login?error=username or password is incorrect");

    req.session.isLoggedIn = true;
    // To get the user across all loggedIn pages I need the username
    req.session.username = user.username
    console.log('user', username)
    req.session.save(() => res.redirect("/library"));
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function logout(req, res) {
  req.session.destroy(() => res.redirect("/"));
}

module.exports = { login, logout };
