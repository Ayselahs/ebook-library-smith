const { Schema, model, models } = require("mongoose");

const GenreSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})


module.exports = models.Genre || model('Genre', GenreSchema)