const mongoose = require('mongoose')
const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
})

const Item = mongoose.model('Item', ItemSchema)
module.exports = Item;