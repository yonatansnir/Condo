const mongoose = require('mongoose')
const ItemSchema = new mongoose.Schema({
    itemID: {
        type: String,
        default: Schema.Types.ObjectId,
    },
    itemName: {
        type: String,
        required: true,
    },

    itemColor: {
        type: String,
        required: true,
    },
    itemStock: {
        type: Number,
        required: true,
    },
})

const Item = mongoose.model('Item', ItemSchema)
module.exports = Item;