const router = require('express').Router();
const { login, validation } = require('./authFunctions');

router.post('/login', login);

router.get('/validation', validation, (req, res) => {
    res.json({
        status: 'success',
        user_data: req.user
    })
});

module.exports = router;
