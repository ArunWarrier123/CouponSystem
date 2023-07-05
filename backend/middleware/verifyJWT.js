const jwt = require('jsonwebtoken')

//checks your access token
const verifyJWT = (req , res , next)=>{
    const authheader = req.headers['authorization']
    if(!authheader) res.sendStatus(401)

    //get access token
    const token = authheader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err , decoded) =>{
            if(err) res.sendStatus(403)
            req.user = decoded.UserInfo.name
            req.role = decoded.UserInfo.role
            next()
        }
    )
}


module.exports = verifyJWT