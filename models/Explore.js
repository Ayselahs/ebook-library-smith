const { Schema, model, models } = require("mongoose");

const exploreSchema = new Schema({
    title: {
        type: String,
    },
    authors: [String],
    picture: String,
    genre: [String],
    link: String,
    isInLibrary: {
        type: Boolean,
        default: false
    }
})

module.exports = models.Explore || model('Explore', exploreSchema)