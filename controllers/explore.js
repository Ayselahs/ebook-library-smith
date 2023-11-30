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

async function searchFun(query) {

    //const searchInput = document.getElementById('searchInput').value
    const info = await fetch(`?title=${searchInput}`)
    const searchedBooks = await info.json()
    const viewVar = { displayed: searchedBooks }
    await viewBooks(null, null, searchInput)
    res.render('searchResult', { searchedBooks })



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

        res.redirect('/library')

    } catch (err) {
        res.status(500).send(err.message)
    }
}

/* 
async function remove(req, res, next) {
    const bookId = req.params.bookId
    const favorite = await Explore.findByIdAndDelete(bookId)
    return res.json(favorite).status(200)
}
*/


module.exports = {
    viewBooks,
    searchFun,
    addingLibrary
} 