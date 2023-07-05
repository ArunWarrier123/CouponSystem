const jwt = require("jsonwebtoken")
const userModel = require("../models/userModels")

//checks if u have a refresh token if so it creates a new accesstoken and returns the access token

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    //if cookies dont exist or cookies exist but no jwt
    if (!cookies?.jwt) return res.sendStatus(401)

    const refreshToken = cookies.jwt

    const userExists = userModel.findOne({ refreshToken })
    if (!userExists) res.sendStatus(403) //forbidden

    //evaluate the refresh token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) res.sendStatus(403)
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "name": decoded.name,
                        "role": decoded.role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            )
            res.json({ accessToken })
        }
    )
}

module.exports = { handleRefreshToken }