const express = require('express')
const router = express.Router()
// const verifyRole = require('../middleware/verifyRole')
// const verifyJWT = require('../middleware/verifyJWT')
const { getproducts, getlength } = require('../controllers/productController')

//after verify role one more function will be called always 
//verify role is just middleware
// router.all('/' , verifyJWT , verifyRole('Admin'))
// router.route('/create').post( createcoupon )
// 
// router.route('/edit').put( editcoupon )

// router.route('/delete/:id').delete( deletecoupon )

router.route('/read').get( getproducts )
router.route('/length').get(getlength)


module.exports = router