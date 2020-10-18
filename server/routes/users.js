const router = require('express').Router();
const {
  getUser,
  getUserId,
  deleteUser,
  updateUserDetails,
  getAllUsers,
  registerNewUser,
} = require('../controller/user.controller');

const { validation } = require('../auth/authFunctions');

//! ALL CRUD routes here !!!

router.get('/', getAllUsers);

// Get user
// router.get('/', [validation, getUser]);

// Register new user
router.post('/register', registerNewUser);
// Update user details
router.patch('/update/:id', [getUserId, updateUserDetails]);
// Delete user
router.delete('/delete/:id', [getUserId, deleteUser]);

module.exports = router;
