const axios = require("axios");
const { Explore } = require("../models");
const { Library } = require("../models");
const { getBooks } = require("../services/util")


async function viewBooks(req, res, query) {
    try {
        const book = await getBooks(query)
        await Explore.insertMany(book)
        console.log('Fetched books: ', book)
        res.render('explore', { book })
    } catch (err) {
        console.log(err.message)
    }
}
async function randomizer(req, res) {
    try {
        const displayBooks = await Explore.aggregate([{ $sample: { size: 30 } }])
        res.render('explore', { displayBooks })
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

        res.render('explore', { searchedBooks })


    } catch (err) {
        console.error(err)
        res.status(500).send(err.message)
    }
}

async function update(req, res) {
    try {
        const username = req.session.username
        const existFav = await Favorites.findOne({ username, bookId })

        if (existFav) {
            res.redirect('/favorites')
        } else {
            const addToFav = new Favorites({ username, bookId })
            await addToFav.save()
            res.redirect('/favorites')
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function remove(req, res, next) {
    const bookId = req.params.bookId
    const favorite = await Favorites.findByIdAndDelete(bookId)
    return res.json(favorite).status(200)
}



module.exports = {
    viewBooks
} 