const { Library } = require("../models");
const { Books } = require("../models");

async function get(req, res) {
    try {
        const username = req.session.username
        const library = await Library.find({ username }).populate('bookId')

        res.render('library', { books: library })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function update(req, res) {
    const bookId = req.params.bookId
    try {
        const username = req.session.username
        const existingBook = await Library.findOne({ username, bookId })

        if (existingBook) {
            existingBook.viewed = true
            await existingBook.save()
            res.redirect('/library')
        } else {
            const libraryEntry = new Library({ username, bookId, viewed: true })
            await new libraryEntry.save()
            res.redirect('/library')
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function remove(req, res, next) {
    const bookId = req.params.bookId
    const library = await Library.findByIdAndDelete(bookId)
    return res.json(library).status(200)
}

module.exports = {
    get,
    update,
    remove
}