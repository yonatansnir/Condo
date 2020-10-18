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
    //   Men / Women / Kids / Unisex etc...
    type: String,
    required: true,
  },
  color: {
    //   example : rgb(115,120,220), #fff etc...
    type: [String],
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
  productDimensions: {
    dimensions: {
      itemHeight: {
        type: Number,
        required: true,
      },
      itemLength: {
        type: Number,
        required: true,
      },
      itemWidth: {
        type: Number,
        required: true,
      },
    },
    itemWeight: {
      type: Number,
      required: true,
    },
  },
  assets: {
    images: [
      {
        imgHeight: {
          type: Number,
          required: true,
        },
        imgWidth: {
          type: Number,
          required: true,
        },
        imgSrc: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

const Item = mongoose.model('item', ItemSchema);
module.exports = Item;
