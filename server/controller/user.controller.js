const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  let users = await User.find();
  res.json(users);
}
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

// exports.register =
//   // insert here all the register logic
//   ([
//     check('fullName', 'Full Name is require.').not().isEmpty(),
//     check('email', 'Please include a valid email.').isEmail(),
//     check(
//       'password',
//       'Please enter password with 6 or more characters.'
//     ).isLength({
//       min: 6,
//     }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const {
//       fullName,
//       email,
//       password,
//       houseNumber,
//       address,
//       city,
//       country,
//       phoneNumber,
//       dateOfBirth,
//       postcode,
//       title,
//     } = req.body;
//     try {
//       let user = await User.findOne({ email });
//       if (user) {
//         return res
//           .status(400)
//           .json({ error: [{ msg: 'User already exists.' }] });
//       }

//       user = new User({
//         fullName,
//         email,
//         password,
//         houseNumber,
//         address,
//         city,
//         country,
//         phoneNumber,
//         dateOfBirth,
//         postcode,
//         title,
//       });

//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);
//       await user.save();

//       const payload = {
//         user: {
//           id: user.id,
//         },
//       };
//       jwt.sign(
//         payload,
//         process.env.JWTSECRET,
//         { expiresIn: 360000 },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   });