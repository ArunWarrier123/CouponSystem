const express = require('express')
const router = express.Router()
const { loginController , logoutController , registerController , printcontroller} = require('../controllers/userControllers')
const verifyJWT = require('../middleware/verifyJWT')
const { handleRefreshToken } = require('../controllers/refreshTokenController')

router.route('/login').post( loginController )

router.route('/logout').get( logoutController )

router.route('/register').post( registerController )

router.route('/jwt').get( verifyJWT, printcontroller )
router.route('/newtoken').get( handleRefreshToken )


module.exports = router