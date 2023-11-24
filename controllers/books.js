const { Books } = require("../models");
const utils = require('../services/utils')

const BOOK_KEY = process.env.API_KEY
const searchRes = await utils.getBooks(title)



async function create(req, res, next) {
    const { title } = req.body
    try {
        res.json({ results: searchRes })
        if (!(title))
            return res.status(400).send("Cannot find book due to the lack of title, author, or ISBN")

        const book = await Books.create({
            title,
            author,
            genre,
            isbn,
            publicationYear
        })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function post(req, res) {
    try {
        const slug = req.params.slug
        const book = await Books.findOne({ slug })
            .populate('genres')
            .toObject()

        book.publicationYear = new Date(book.publicationYear).toLocaleString('en-US', {
            year: 'numeric'
        })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

async function getAll(req, res) {
    try {
        const dbQuery = {}
        if (req.query.genre) {
            const genreDoc = await Genre.findOne({ name: req.query.genre }).lean()
            if (genreDoc) {
                dbQuery.genres = { _id: genreDoc._id }
            }
        }
        const bookDocs = await Books.find(dbQuery).populate({ path: 'genres' })

        res.render('library', { books, isL })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

