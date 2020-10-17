const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
  user: {
    // *This connect the user to his Cart.
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  items: [
    // *This will hold all the items that the user add to his cart.
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
      },
    },
  ],
  price: {
    totalItemsPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    shippingPrice: {
      type: Number,
      required: true,
    },
    finalPrice: {
      type: Number,
      required: true,
    },
  },
});

const Cart = mongoose.model('cart', CartSchema);
module.exports = Cart;
