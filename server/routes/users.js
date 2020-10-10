const router = require('express').Router();
const { getUser, getUserId, deleteUser } = require('../controller/user.controller');
const { validation } = require('../auth/authFunctions');

//! ALL CRUD routes here !!!

// Get user
router.get('/', validation, getUser);

// Delete user
router.delete('/:id', [getUserId, deleteUser]);

module.exports = router;
