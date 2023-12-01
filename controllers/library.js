const { Library, Explore, User } = require("../models");


async function get(req, res) {
    const username = req.session.username
    const isLoggedIn = req.session.isLoggedIn
    try {


        console.log('username', username)
        const userObj = await User.findOne({ username }).populate({
            path: 'library',
            model: 'Explore'
        }).lean()
        //const addedBook = await Explore.find({ isInLibrary: true }).lean()
        const usersBooks = userObj.library
        console.log('library books:', usersBooks)
        //const libraryB = await Explore.find({ bookId }).populate('username')
        console.log('rendeer', { usersBooks, isLoggedIn })
        res.render('library', { usersBooks, isLoggedIn })
    } catch (err) {
        res.status(500).send(err.message)
    }
}


async function remove(req, res) {
    const { bookId } = req.params
    console.log(bookId)
    try {
        await Explore.findByIdAndDelete(bookId)
        res.redirect('/library')
    } catch (err) {
        res.status(500).send(err.message)
    }

}

module.exports = {
    get,
    remove
}