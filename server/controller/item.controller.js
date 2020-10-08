const Item = require('../models/Item.js')

const itemController = {};

itemController.getAllItems = async (req, res) => {
    try {
        const items = await Item.find()
        res.send(items)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

itemController.createItem = async (req, res) => {
    const item = new Item({
        itemName: req.body.itemName,
        itemColor: req.body.itemColor,
        itemStock: req.body.itemStock
    })
    try {
        const newItem = await item.save()
        res.status(201).json(newItem)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })

    }
}

itemController.getById = async (req, res, next) => {
    let item
    try {
        item = await Item.findById(req.params.id)
        if (item == null) {
            return res.status(404).json({
                message: "Cannot find item."
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
    res.item = item
    next();
}

itemController.getSpecificItem = (req, res) => {
    res.json(res.item)
}

itemController.updateSpecificItem = async (req, res) => {
    if (req.body.itemName != null) {
        res.item.itemName = req.body.itemName
    }
    if (req.body.itemColor != null) {
        res.item.itemColor = req.body.itemColor
    }
    if (req.body.itemStock != null) {
        res.item.itemStock = req.body.itemStock
    }
    try {
        const updatedItem = await res.item.save()
        res.json(updatedItem)
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

itemController.deleteItem = async (req, res) => {
    try {
        await res.item.remove()
        res.json({
            message: 'Deleted Item'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = itemController;