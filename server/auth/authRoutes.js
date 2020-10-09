const router = require('express').Router();
const { login } = require('./authFunctions');

router.get('/login', login);

router.get('/validation', );

module.exports = router;