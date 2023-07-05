const express = require('express')
const router = express.Router()
const { loginController , logoutController , registerController , printcontroller} = require('../controllers/userControllers')
const verifyJWT = require('../middleware/verifyJWT')
const { handleRefreshToken } = require('../controllers/refreshTokenController')
const verifyRole = require('../middleware/verifyRole')

router.route('/login').post( loginController )
router.route('/verifyrole').get( verifyJWT , (req , res) =>{ 
    console.log('last func called' + req.role)
    res.json(
        {
            "role": req.role
        }
    )})

router.route('/logout').get( logoutController )

router.route('/register').post( registerController )

router.route('/jwt').get( verifyJWT, printcontroller )
router.route('/newtoken').get( handleRefreshToken )


module.exports = router