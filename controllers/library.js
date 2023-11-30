const { Library, Explore } = require("../models");
const { Books } = require("../models");

async function get(req, res) {
    try {

        const username = req.session.username
        const bookId = req.query.id
        const addedBook = await Explore.find({ isInLibrary: true }).lean()
        console.log('library books:', addedBook)
        //const libraryB = await Explore.find({ bookId }).populate('username')

        res.render('library', { addedBook })
    } catch (err) {
        res.status(500).send(err.message)
    }
}
/*
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
            res.redirect('/api/library')
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}*/

async function remove(req, res) {
    const { bookId } = req.params
    try {
        await Explore.findByIdAndDelete(
            {
                _id: bookId
            },
            {
                isInLibrary: false
            }
        )
        res.redirect('/api/library')
    } catch (err) {
        res.status(500).send(err.message)
    }

}

module.exports = {
    get,
    remove
}