const { findOne } = require('../models/User');
const { responseWithError, validateDate } = require('../common/helper');
const { generateAccessToken } = require('../auth/authFunctions');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  let users = await User.find();
  res.json(users);
};
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
      return res.status(404).json({
        message: 'User do not exits',
      });
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

// Register User
exports.registerNewUser = async (req, res) => {
  let input = {};

  // { a: 1, b: 2, c: 3 } // [ 'a', 'b', 'c' ] //
  // req.body ? req.body[key] : null
  Object.keys(req.body).forEach((key, i) => {
    if (typeof req.body[key] === 'object') return (input[key] = req.body[key]);

    let value = req.body[key] && req.body[key].toString().trim();
    input[key] = value;
  });

  // All the fields with require.
  // Use for the `key's`.
  const requiredFields = [
    'fullName',
    'email',
    'password',
    'passwordValidation',
    'address',
    'phoneNumber',
    'dateOfBirth',
    'title',
  ];

  const {
    fullName,
    email,
    password,
    passwordValidation,
    phoneNumber,
    address,
    dateOfBirth,
    title,
  } = input;

  // Validation
  try {
    requiredFields.forEach((field) => {
      if (!input[field])
        throw Error('All fields are required.' + input[field] + ' ' + field);
    });

    if (
      !address.country ||
      !address.city ||
      !address.street ||
      !address.houseNumber ||
      !address.postalCode
    )
      throw Error('All fields are required.');

    const nameRegex = new RegExp(/^[a-zA-Z]+$/);
    if (!nameRegex.test(fullName)) throw Error('Name must be only letters.');

    const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!emailRegex.test(email))
      throw Error('Please provide valid email address.');

    if (password !== passwordValidation) throw Error('Password do not match.');
    // if(password.length > 6 && )

    const phoneRegex = new RegExp(/^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/);

    if (!phoneRegex.test(phoneNumber))
      throw Error('Please Provide valid phone number.');

    // Date of birth must be yyyy-mm-dd
    const [y, m, d] = dateOfBirth.split('-');
    if (!validateDate(y, m, d)) throw Error('Please provide valid date.');

    const mailAlreadyInUse = await User.findOne({ email });
    if (mailAlreadyInUse) throw Error('Email already in use.');

    const user = new User({
      ...input,
      ...address,
    });

    await user.save();
    const token = generateAccessToken(user.id);
    res.status(200).json({ user, token });
  } catch (error) {
    return responseWithError(res, 400, [error.message]);
  }
};
