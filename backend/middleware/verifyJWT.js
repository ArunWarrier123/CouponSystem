const jwt = require('jsonwebtoken')

//checks your access token
const verifyJWT = (req , res , next)=>{
    const authheader = req.headers['authorization']
    if(!authheader) res.sendStatus(401)
    console.log(authheader)

    //get access token
    const token = authheader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err , decoded) =>{
            // console.log("name " + decoded.UserInfo.role)
            if(err) res.sendStatus(403)
            req.user = decoded.UserInfo.name
            req.role = decoded.UserInfo.role
            console.log('verifyjwt done')
            next()
        }
    )
}


module.exports = verifyJWT