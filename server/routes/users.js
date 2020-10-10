const router = require('express').Router();
const auth = require('../middleware/auth');
const { getUser, getUserId, deleteUser } = require('../auth/userCrud');

//! ALL CRUD routes here !!!

// Get user
router.get('/', auth, getUser);

// Delete user
router.delete('/:id', [getUserId, deleteUser]);

module.exports = router;
