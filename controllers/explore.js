const axios = require("axios");
const { Explore } = require("../models");
const { Library } = require("../models");
const { getBooks } = require("../services/util")


async function viewBooks(req, res, query) {
    try {

        // Try to retrive from database
        const displayedBooks = await getBooks(query)
        console.log(query)
        const databaseInfo = await Explore.insertMany(displayedBooks)
        console.log('Fetched books: ', displayedBooks)
        console.log('Books info:', databaseInfo)
        res.render('explore', { displayedBooks })



    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function searchFun(req, res) {
    const searchInput = req.query.q
    console.log('Search query', searchInput)
    try {
        if (!(searchInput)) {
            return res.render('searchResult', { searchResult: [] })
        }

        const searchResult = await Explore.find({ title: { $regex: new RegExp(searchInput, 'i') } }).lean()
        console.log('Searching for:', searchResult)
        console.log('Search query', searchInput)
        res.render('searchResult', { searchResult, searchInput })
    } catch (err) {
        res.status(500).send(err.message)
    }

}


async function addingLibrary(req, res) {
    const { title, authors, genre, picture } = req.body
    try {
        console.log(req.body)
        const addBook = new Explore({
            title,
            authors,
            genre,
            picture,
            isInLibrary: true
        })
        await addBook.save()
        console.log("Add to library:", addBook)

        res.redirect('/api/library')

    } catch (err) {
        res.status(500).send(err.message)
    }
}



module.exports = {
    viewBooks,
    searchFun,
    addingLibrary
} 