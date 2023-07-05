const verifyRole = (allowedRole)=>{

    return (req, res , next ) =>{
        if(req.role !== allowedRole)  res.sendStatus(401) //unauthorized
        next()
    }
    }
        
module.exports = verifyRole