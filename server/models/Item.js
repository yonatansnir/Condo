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
      },
      itemLength: {
        type: Number,
      },
      itemWidth: {
        type: Number,
      },
    },
    itemWeight: {
      type: Number,
    },
  },
  assets: {
    images: [
      {
        imgHeight: {
          type: Number,
        },
        imgWidth: {
          type: Number,
        },
        imgSrc: {
          type: String,
        },
      },
    ],
  },
});

const Item = mongoose.model('item', ItemSchema);
module.exports = Item;
