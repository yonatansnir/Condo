const router = require('express').Router();

const {
    getAllItems, getById, getSpecificItem, createItem, updateSpecificItem, deleteItem
} = require('../controller/item.controller');

router.get('/', getAllItems);

router.get('/:id', getById, getSpecificItem);

router.post('/', createItem);

router.patch('/:id', getById, updateSpecificItem);

router.delete('/:id', getById, deleteItem)


module.exports = router;