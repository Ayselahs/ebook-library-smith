const { Schema, model, models } = require("mongoose");


const BookSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: String,
        publicationYear: Number,
        ISBN: {
            type: String,
            unique: true,
            required: true
        },
        description: String,
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
)




module.exports = models.Books || model('Books', BookSchema)