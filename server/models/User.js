const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    houseNumber: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true,
    },
    postcode: {
        type: String,
        required: true,
    },
    title: { // Mr || Ms etc..
        type: String,
        required: true,
    },

})

const User = mongoose.model('User', UserSchema)
module.exports = User;

