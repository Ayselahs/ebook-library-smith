const axios = require("axios");
const { Explore, User } = require("../models");
const { Library } = require("../models");
const { getBooks } = require("../services/util")


async function viewBooks(req, res) {
    const username = req.session.username
    const isLoggedIn = req.session.isLoggedIn
    try {

        console.log('Username explore', username)
        console.log('Reached')
        // Try to retrive from database
        const displayedBooks = await getBooks()
        console.log('Reached here')
        res.render("explore", { displayedBooks, username, isLoggedIn })
        //const databaseInfo = await Explore.insertMany(displayedBooks)

        //console.log('Fetched books: ', displayedBooks)



    } catch (err) {
        console.log('This is the error:', err)
        throw err
    }
}

async function searchFun(req, res) {
    const searchInput = req.query.q
    const username = req.session.username
    const isLoggedIn = req.session.isLoggedIn
    console.log('Search query', searchInput)
    try {
        if (!(searchInput)) {
            return res.render('searchResult', { searchResult: [] })
        }

        const searchResult = await Explore.find({ title: { $regex: new RegExp(searchInput, 'i') } }).lean()
        console.log('Searching for:', searchResult)
        console.log('Search query', searchInput)
        res.render('searchResult', { searchResult, searchInput, isLoggedIn })
    } catch (err) {
        console.log('This has an error:', err)
        res.status(500).send(err.message)
    }

}


async function addingLibrary(req, res) {
    const { title, authors, genre, picture } = req.body
    const username = req.session.username
    try {
        console.log(req.body)
        const addBook = new Explore({
            title,
            authors,
            genre,
            picture,
            isInLibrary: true,
        })
        await addBook.save()
        const user = await User.findOne({ username })
        if (user) {
            user.library.push(addBook._id)
            await user.save()
            console.log("Add to library:", addBook)
            res.redirect('/library')
        } else {
            res.status(404).send('User not found')
        }

    } catch (err) {
        console.log('This may have error:', err)
        res.status(500).send(err.message)
    }
}



module.exports = {
    viewBooks,
    searchFun,
    addingLibrary
} 