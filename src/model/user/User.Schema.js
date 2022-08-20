const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true
    },
    company: {
        type: String,
        maxlength: 50,
        required: true
    },
    address: {
        type: String,
        maxlength: 150,
        required: true
    },
    phone: {
        type: Number,
        maxlength: 10,
    },
    email: {
        type: String,
        maxlength: 50,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 150,
        required: true
    },


})

module.exports = {
    UserSchema: mongoose.model("User", UserSchema)
}