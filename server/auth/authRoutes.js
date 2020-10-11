const router = require('express').Router();
const { login, validation, register } = require('./authFunctions');

router.post('/login', login);
router.post('/register', register);

router.get('/validation');

module.exports = router;
