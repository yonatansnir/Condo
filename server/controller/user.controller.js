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
// Update User Details
exports.updateUserDetails = async (req, res) => {
  if (req.body.address != null) {
    res.user.address = req.body.address;
  }
  if (req.body.fullName != null) {
    res.user.fullName = req.body.fullName;
  }
  if (req.body.houseNumber != null) {
    res.user.houseNumber = req.body.houseNumber;
  }
  if (req.body.city != null) {
    res.user.city = req.body.city;
  }
  if (req.body.country != null) {
    res.user.country = req.body.country;
  }
  if (req.body.phoneNumber != null) {
    res.user.phoneNumber = req.body.phoneNumber;
  }
  if (req.body.postcode != null) {
    res.user.postcode = req.body.postcode;
  }
  if (req.body.title != null) {
    res.user.title = req.body.title;
  }

  try {
    const updatedUser = await res.user.save();
    // res.json(updatedUser);
    res.json(newDetails);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
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
