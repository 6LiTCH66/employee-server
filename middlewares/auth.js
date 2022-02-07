const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.access_token;

    if(!accessToken){
        return res.status(403).send("A token is required for authentication")
    }
    try{

        req.user = jwt.verify(accessToken, process.env.ACCESS_TOKEN)

    }catch (error){
        return res.sendStatus(401);
    }
    return next()
}
module.exports = verifyToken;