const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {check,validationResult}=require('express-validator')
const User = require('../models/User')

const userAuth = {}

userAuth.getUser = async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error.')
        
    }
}

userAuth.loginUser = ([
    check('email','Please include a valid email.').isEmail(),
    check('password','Password is required.').exists()
],
async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {
        email,
        password,
    }=req.body;
    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error:[{msg:'Invalid Credentials.'}]})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({error:[{msg:'Invalid Credentials.'}]})
        }   

    const payload = {
        user:{
            id:user.id
        }
    }    
        jwt.sign(payload,
            process.env.JWTSECRET,
            {expiresIn:360000},
            (err,token)=>{
                if(err) throw err
                res.json({token})

            })
    
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

userAuth.registerUser =([
    check('fullName','Full Name is require.').not().isEmpty(),
    check('email','Please include a valid email.').isEmail(),
    check('password','Please enter password with 6 or more characters.').isLength({
        min:6
    })
],
async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {fullName,
        email,
        password,
        houseNumber,
        address,
        city,
        country,
        phoneNumber,
        dateOfBirth,
        postcode,
        title}=req.body;
    try {
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({error:[{msg:'User already exists.'}]})
        }

        user = new User ({
            fullName,
            email,
            password,
            houseNumber,
            address,
            city,
            country,
            phoneNumber,
            dateOfBirth,
            postcode,
            title
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt)
        await user.save()

    const payload = {
        user:{
            id:user.id
        }
    }    
        jwt.sign(payload,
            process.env.JWTSECRET,
            {expiresIn:360000},
            (err,token)=>{
                if(err) throw err
                res.json({token})

            })
    
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports=userAuth