const axios = require("axios");
const { Explore, User } = require("../models");
const { Library } = require("../models");
const { getBooks } = require("../services/util")


async function viewBooks(req, res) {
    // check for username and if logged
    const username = req.session.username
    const isLoggedIn = req.session.isLoggedIn
    try {

        // testing
        console.log('Username explore', username)
        console.log('Reached')
        // Try to retrive from database
        const displayedBooks = await getBooks()
        console.log('Reached here')
        // render any books asociated with the loggedin username
        res.render("explore", { displayedBooks, username, isLoggedIn })
        //const databaseInfo = await Explore.insertMany(displayedBooks)

        //console.log('Fetched books: ', displayedBooks)



    } catch (err) {
        console.log('This is the error:', err)
        throw err
    }
}

async function searchFun(req, res) {
    // make the searchInput become query
    const searchInput = req.query.q
    const username = req.session.username
    const isLoggedIn = req.session.isLoggedIn
    console.log('Search query', searchInput)
    try {
        if (!(searchInput)) {
            return res.render('searchResult', { searchResult: [] })
        }
        // compare the searched text to any book titles
        const searchQuery = {
            $or: [
                { title: { $regex: new RegExp(searchInput, 'i') }, }
            ]
        }

        const searchResult = await Explore.find(searchQuery).lean()
        console.log('Searching for:', searchResult)
        console.log('Search query', searchInput)
        res.render('searchResult', { searchResult, isLoggedIn })
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
        // create the book to add by the schema of the book adding
        const addBook = new Explore({
            title,
            authors,
            genre,
            picture,
            isInLibrary: true,
        })
        // save the new book
        await addBook.save()
        // associate it with the logged username
        const user = await User.findOne({ username })
        if (user) {
            // if the username is logged push the book to library
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