const axios = require("axios");
const { Explore } = require("../models");
const { Library } = require("../models");
const { getBooks } = require("../services/util")
const { addToLibrary } = require("../services/util")


async function viewBooks(req, res, query) {
    try {
        const displayBooks = await Explore.aggregate([{ $sample: { size: 10 } }])
        res.render('explore', { bookData: displayBooks })

        console.log('Fetched books: ', { bookData: displayBooks })

    } catch (err) {
        console.log(err.message)
    }
}

async function addingLibrary(req, res) {
    const bookId = req.params.id
    try {
        const book = await addToLibrary(bookId)
        res.json(book)
    } catch (err) {
        res.status(500).send(err.message)
    }
}
async function randomizer(req, res) {
    try {
        const displayBooks = await Explore.aggregate([{ $sample: { size: 8 } }])
        res.render('explore', { bookData: displayBooks })
        console.log('Fetched books: ', displayBooks)
    } catch (err) {
        console.error(err)
        res.status(500).send(err.message)
    }
}

async function getSearched(req, res) {
    const query = req.query.q
    try {

        const searchedBooks = await Explore.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { authors: { $regex: query, $options: 'i' } }
            ]
        })

        res.render('library', { searchedBooks })


    } catch (err) {
        console.error(err)
        res.status(500).send(err.message)
    }
}

async function create(req, res) {
    try {
        const { title, authors } = req.body
        const existInFav = new Explore({ title, authors, picture, link })
        await existInFav.save()
        res.redirect('/library')
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function remove(req, res, next) {
    const bookId = req.params.bookId
    const favorite = await Explore.findByIdAndDelete(bookId)
    return res.json(favorite).status(200)
}



module.exports = {
    viewBooks,
    addingLibrary,
    randomizer,
    getSearched,
    create,
    remove
} 