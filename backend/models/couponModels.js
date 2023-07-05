const mongoose = require('mongoose')

const couponSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        unique: true
    },
    value:{
        type: Number,
        required: true
    },
    expiration:{
        type: Date,
        required: true
    }
})


const couponModel = mongoose.model('coupons' , couponSchema)

module.exports = couponModel