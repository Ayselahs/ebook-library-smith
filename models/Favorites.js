const { Schema, model, models } = require("mongoose");

const favoritesSchema = new Schema({
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    }
})

module.exports = models.Favorites || model('Favorites', favoritesSchema)