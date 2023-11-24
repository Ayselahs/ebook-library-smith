const { Schema, model, models } = require("mongoose");

const librarySchema = new Schema({
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    viewed: {
        type: Boolean,
        default: false
    }
})

module.exports = models.Library || model('Library', librarySchema)