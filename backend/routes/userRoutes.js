const express = require('express')
const router = express.Router()
const { loginController , logoutController , registerController , printcontroller} = require('../controllers/userControllers')
const verifyJWT = require('../middleware/verifyJWT')
const { handleRefreshToken } = require('../controllers/refreshTokenController')

router.route('/login').post( loginController )
router.route('/verifyrole').get( verifyJWT , (req , res) =>{ 
    res.json(
        {
            "role": req.role
        }
    )})

router.route('/logout').get( logoutController )

router.route('/register').post( registerController )

//not used in frontend currently. need to be implemented later
router.route('/newtoken').get( handleRefreshToken )


module.exports = router