

const verifyRole = (allowedRole)=>{
    return (req, res , next ) =>{
        console.log(req.role)
        if(req.role !== allowedRole)  res.sendStatus(401) //unauthorized
        next()
    }
    }
        
module.exports = verifyRole