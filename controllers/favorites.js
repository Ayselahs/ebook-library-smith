const { Favorites } = require("../models");
const { Books } = require("../models");


async function get(req, res) {
    try {
        const username = req.session.username
        const favorites = await Favorites.find({ username }).populate('bookId')

        res.render('favorites', { favorites })
    } catch (err) {
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
    get,
    update,
    remove
}