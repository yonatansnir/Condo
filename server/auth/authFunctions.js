const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

exports.login =
  ([
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Password is required.').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email }).select('password');
      if (!user)
        return res
          .status(400)
          .json({ error: [{ msg: 'Invalid Credentials.' }] });

      if (!user.comparePassword(password))
        return res.status(400).json({ error: 'Invalid Credentials.' });

      let user_data = { id: user._id, full_name: user.full_name };

      res.json({
        status: 'success',
        user_data,
        token: generateAccessToken(user_data),
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

// authorization: bearer token
exports.validation = (req, res, next) => {
  let headAuth = req.headers['authorization'];
  let token = headAuth && headAuth.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWTSECRET, (err, user) => {
    if (err) res.sendStatus(403);
    req.user = user;
    next();
  });
};

exports.generateAccessToken = (id) => {
  let option = {};
  return jwt.sign(id, process.env.JWTSECRET || 'NotSecuredToken');
};
