const { Schema, model, models } = require("mongoose");

const exploreSchema = new Schema({
    title: String,
    author: [String],
    //picture: String,
    //genre: String
})

module.exports = models.Explore || model('Explore', exploreSchema)