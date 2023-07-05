const express = require('express')
const router = express.Router()
const verifyRole = require('../middleware/verifyRole')
const verifyJWT = require('../middleware/verifyJWT')

//after verify role one more function will be called always 
//verify role is just middleware
router.route('/create').get(  verifyJWT, verifyRole('Admin'), (req , res) =>{
    res.send('created coupon succesfully')
})


module.exports = router