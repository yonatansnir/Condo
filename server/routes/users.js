const router = require('express').Router();
const auth = require('../middleware/auth')
const {getUser,loginUser,registerUser} = require('../auth/userAuth')

// get user
router.get('/',auth,getUser)
// login user
router.post('/login',loginUser)
// Register User
router.post('/register',registerUser)

module.exports=router;
