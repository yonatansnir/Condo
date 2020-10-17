const Item = require('../models/Item.js');

const itemController = {};

itemController.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.send(items);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

itemController.createItem = async (req, res) => {
  const {
    name,
    description,
    category,
    brand,
    color,
    quantity,
    price,
    itemHeight,
    itemLength,
    itemWidth,
    itemWeight,
    imgHeight,
    imgWidth,
    imgSrc,
  } = req.body;

  // Build items object
  const itemFields = {};
  if (name) itemFields.name = name;
  if (description) itemFields.description = description;
  if (category) itemFields.category = category;
  if (brand) itemFields.brand = brand;
  if (color) {
    itemFields.color = color.split(',').map((color) => color.trim());
  }
  if (quantity) itemFields.quantity = quantity;
  if (price) itemFields.price = price;

  // Build shipping dimensions object
  //   itemFields.shipping = {};
  //   itemFields.shipping = [{}];
  //   if (itemWeight) itemFields.shipping.itemWeight = itemWeight;

  //   itemFields.shipping.dimensions = [{}];
  //   if (itemHeight) itemFields.shipping.dimensions.itemHeight = itemHeight;
  //   if (itemLength) itemFields.shipping.dimensions.itemLength = itemLength;
  //   if (itemWidth) itemFields.shipping.dimensions.itemWidth = itemWidth;

  itemFields.shipping = {};
  if (itemHeight) itemFields.shipping.itemHeight = itemHeight;
  if (itemLength) itemFields.shipping.itemLength = itemLength;
  if (itemWidth) itemFields.shipping.itemWidth = itemWidth;
  if (itemWeight) itemFields.shipping.itemWeight = itemWeight;

  //   Build assets images object
  itemFields.assets = {};
  //   itemFields.assets.images = [{}];
  //   if (imgHeight) itemFields.assets.images.imgHeight = imgHeight;
  //   if (imgWidth) itemFields.assets.images.imgWidth = imgWidth;
  //   if (imgSrc) itemFields.assets.images.imgSrc = imgSrc;
  if (imgHeight) itemFields.assets.imgHeight = imgHeight;
  if (imgWidth) itemFields.assets.imgWidth = imgWidth;
  if (imgSrc) itemFields.assets.imgSrc = imgSrc;

  //   Create item
  try {
    item = new Item(itemFields);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

/* itemController.createItem = async (req, res) => {
    const item = new Item({
        name: req.body.name,
        color: req.body.color,
        stock: req.body.stock
    })
    try {
        const newItem = await item.save()
        res.status(201).json(newItem)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })

    }
} */

itemController.getById = async (req, res, next) => {
  let item;
  try {
    item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({
        message: 'Cannot find item.',
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
  res.item = item;
  next();
};

itemController.getSpecificItem = (req, res) => {
  res.json(res.item);
};

itemController.updateSpecificItem = async (req, res) => {
  if (req.body.name != null) {
    res.item.name = req.body.name;
  }
  if (req.body.color != null) {
    res.item.color = req.body.color;
  }
  if (req.body.stock != null) {
    res.item.stock = req.body.stock;
  }
  try {
    const updatedItem = await res.item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

itemController.deleteItem = async (req, res) => {
  try {
    await res.item.remove();
    res.json({
      message: 'Deleted Item',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = itemController;
