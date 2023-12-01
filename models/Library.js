const { Schema, model, models } = require("mongoose");

const librarySchema = new Schema({
    username: {
        type: Schema.Types.String,
        ref: 'User',
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Explore',
    },
    viewed: {
        type: Boolean,
        default: false
    }
})

module.exports = models.Library || model('Library', librarySchema)