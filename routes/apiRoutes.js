const router = require("express").Router();
const { default: axios } = require("axios");
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");
const { Explore } = require("../models");



// admin login/logout
router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);

// Book API
//router.get("/favorites", controllers.favorites.get)
router.get("/library", controllers.library.get)
router.get("/explore", controllers.explore.viewBooks)
router.get("/explore/search", controllers.explore.searchFun)

// Explore

//router.get("/search", controllers.explore.searchBooks)
//router.get("/search/searchResult", controllers.searchResults)
router.post("/explore/add", controllers.explore.addingLibrary)
router.post("/library/delete/:bookId", controllers.library.remove)

//router.get('/search', controllers.explore.getSearched)

// Library
//router.post("/library/add/:bookId", controllers.library.update)
//router.post("/library/remove:bookId", controllers.library.remove)


// Explore
//router.get("/search", controllers.explore.getSearched)


//router.post("/favorites/add/:bookId", controllers.explore.update)
//router.post("/favorites/remove/:bookId", controllers.explore.update)

module.exports = router;
