const axios = require('axios')
const { Explore } = require('../models')

const BOOKS_URL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = process.env.API_KEY

async function getBooks() {
    try {
        const { data } = await axios.get(
            `${BOOKS_URL}?q=subject:fiction`

        )
        if (data.items && data.items.length > 0) {
            return data.items.map(item => ({
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors || [],
                picture: item.volumeInfo.imageLinks.thumbnail,
                genre: item.volumeInfo.categories || [],
                link: item.volumeInfo.infoLink
            }))


        } else {
            throw new Error('Books not found')
        }


    } catch (err) {
        console.log(err)
        throw new Error('Problem fetching books')
    }
}



module.exports = {
    getBooks
}