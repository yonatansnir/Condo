const mongoose = require('mongoose')
const CartSchema = new mongoose.Schema({
    totalItemsPrice: {
        type: Number,
        required: true,
    },
    finalPrice: {
        type: Number,
        required: true,
    },
    shippingPrice: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    items: // here we will save all the details about the items the user save in cart. array of items ID.
        [String],

})

const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart;

