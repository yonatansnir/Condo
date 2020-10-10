const router = require('express').Router();
const { login, validation } = require('./authFunctions');

router.post('/login', login);

router.get('/validation', );

module.exports = router;
