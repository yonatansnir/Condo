const User = require('../models/User');

// Find user ID
exports.getUserId = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({
        message: 'Cannot find user.',
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
  res.user = user;
  next();
};

// Get User
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user == null) {
      return res.status(404).json({ message: 'User do not exits' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    await res.user.remove();
    res.json({
      message: 'Deleted User',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
