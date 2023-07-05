const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    hashedpw:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    refreshToken:{
        type: String,
    }

})


const userModel = mongoose.model('users' , UserSchema)

module.exports = userModel