const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    //   Men / Women / Kids etc...
    type: String,
    required: true,
  },
  brand: {
    //   New / Used / Old etc...
    type: String,
    required: true,
  },
  color: {
    //   example : rgb(115,120,220)
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shipping: [
    {
      dimensions: [
        {
          height: {
            type: Number,
            required: true,
          },
          length: {
            type: Number,
            required: true,
          },
          width: {
            type: Number,
            required: true,
          },
        },
      ],
      weight: {
        type: Number,
        required: true,
      },
    },
  ],
  assets: [
    {
      images: [
        {
          height: {
            type: Number,
            required: true,
          },
          width: {
            type: Number,
            required: true,
          },
          src: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
