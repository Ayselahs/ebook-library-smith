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

router.get('/search', async (req, res) => {
    try {
        const query = req.query.query
        const book = await searchBooks(query)
        res.json(book)
    } catch (err) {
        console.log(err.message)
    }
})

// Library
//router.post("/library/add/:bookId", controllers.library.update)
//router.post("/library/remove:bookId", controllers.library.remove)

// Favorites
//router.post("/favorites/add/:bookId", controllers.favorites.update)
//router.post("/favorites/remove:bookId", controllers.favorites.remove)

// Explore
//router.get("/search", controllers.explore.getSearched)

//router.post("/favorites/add/:bookId", controllers.explore.update)
//router.post("/favorites/remove/:bookId", controllers.explore.update)
/*
router.get("/", async (req, res) => {
    try {
        const getApi = await axios.get('https://www.googleapis.com/books/v1/volumes?q=')
        const books = getApi.data.items

        books.forEach(async (book) => {
            const createBook = new controllers.explore.randomizer({
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors
            })
            await createBook.save()
        })

    } catch (err) {
        res.status(500).send(err.message)
    }
})
*/
module.exports = router;
