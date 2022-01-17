const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token){
        return res.status(403).send("A token is required for authentication")
    }
    try{
        req.user = jwt.verify(token, "ilja-secret-key")
    }catch (error){
        return res.sendStatus(401);
    }
    return next()
}
module.exports = verifyToken;