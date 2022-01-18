const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.access_token;

    const refreshToken = req.cookies.refresh_token;

    if(!accessToken){
        return res.status(403).send("A token is required for authentication")
    }

    if(!refreshToken){
        return res.status(403).send("A token is required for authentication")
    }

    try{
        req.user = jwt.verify(accessToken, "ilja-secret-key")
        req.user = jwt.verify(refreshToken, "ilja-secret-key")
    }catch (error){
        return res.sendStatus(401);
    }
    return next()
}
module.exports = verifyToken;