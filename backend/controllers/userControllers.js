const bcryptjs = require('bcryptjs')
const userModel = require('../models/userModels')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


const loginController = async (req, res) => {
    // res.send('Login Controller called')
    const { email, password } = req.body

    const userExists = await userModel.findOne({ email })

    if (userExists) {
        const hashedpw = userExists.hashedpw
        const confirmpw = await matchedPassword(password, hashedpw)
        if (confirmpw) {
            //logged in succesfully 
            //first we create tokens
            const accessToken = jwt.sign(
                { "UserInfo": {
                    "name": userExists.name ,
                    "role": userExists.role}
                } ,
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            )
                console.log("printing role from db" + userExists.role)
            const refreshToken = jwt.sign(
                { "name": userExists.name },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            )
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            res.json(accessToken)
        }
        else res.status(401).send('Invalid password ')
    }
    else {
        res.status(401).send('No Such User Exists')
    }

}

const logoutController = (req, res) => {
    res.clearCookie('jwt' , { httpOnly: true})
    res.send('logout Controller called')

}
const registerController = async (req, res, next) => {
    // res.send('Register Controller called')

    const { name, email, password, role } = req.body

    const old_user = await userModel.findOne({ email })

    if (old_user){
        console.log('user found')
        res.status(409).send('Email Address Already in Use. Please Login')

    } 
    else{
        const hashedpw = await encryptor(password)

        const newuser = await userModel.create({
            name,
            email,
            hashedpw,
            role
        })
    
        if (newuser) {
            const accessToken = jwt.sign(
                { "name": name ,
                    "role": role},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            )
    
            const refreshToken = jwt.sign(
                { "name": name },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            )
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            res.json(accessToken)
    
        }
        else res.send('Unable to create User')
    }


}

const printcontroller = (req, res) => {
    res.send('succesfull')
}


//function to encrypt password
async function encryptor(enteredpassword) {
    const salt = await bcryptjs.genSalt(10) // the higher the value the better the security
    return await bcryptjs.hash(enteredpassword, salt)
}


//function to decrypt and match password given
async function matchedPassword(enteredpassword, hashedpw) {
    return await bcryptjs.compare(enteredpassword, hashedpw)
}


module.exports = { loginController, logoutController, registerController, printcontroller }