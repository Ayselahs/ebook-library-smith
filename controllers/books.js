const { Books } = require("../models");

async function create(req, res, next) {
    const { title, author, genre, isbn } = req.body

    try {
        if (!(title && author && isbn))
            return res.status(400).send("Cannot find book due to the lack of title, author, or ISBN")

        const book = await Books.create({
            title,
            author,
            genre,
            isbn
        })
    } catch (err) {

    }
}