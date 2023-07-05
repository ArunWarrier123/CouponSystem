

const verifyRole = (allowedRole)=>{

    return (req, res , next ) =>{
        console.log('mid for verify role called')
        console.log(req.role + "printing role in req inside middleware")
        if(req.role !== allowedRole)  res.sendStatus(401) //unauthorized
        next()
    }
    }
        
module.exports = verifyRole