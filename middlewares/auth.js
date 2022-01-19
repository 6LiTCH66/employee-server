const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.access_token;

    const refreshToken = req.cookies.refresh_token;

    if(!accessToken && !refreshToken){
        return res.status(403).send("A token is required for authentication")
    }


    try{
        const user = jwt.verify(refreshToken, "ilja-secret-key-refresh-token")

        const {id, email} = user

        const accessToken = jwt.sign(
            {id: id, email},
            "ilja-secret-key",
            {
                expiresIn: "15s"
            }
        );

        res.cookie("access_token", accessToken, {httpOnly: true, maxAge: 15 * 60 * 1000})

        req.user = jwt.verify(accessToken, "ilja-secret-key")

    }catch (error){
        return res.sendStatus(401);
    }
    return next()
}
module.exports = verifyToken;