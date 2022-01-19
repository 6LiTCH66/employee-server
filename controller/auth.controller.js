const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const models = require('../model/user.model')
const {createUserAuth, createLogoutAt, updateUserAuth} = require("./user_auth.controller");
const {validationResult} = require('express-validator')

const signup = async (req, res) =>{
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({message: "Error while signup", errors})
        }

        const {email, password} = req.body;

        const candidate = await models.findOne({where: {email: email}})

        if(candidate){
            return res.status(400).send("User already exist. Please Login")
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await models.create({
            email,
            password: encryptedPassword,
        });

        await createUserAuth(null, null, null, null)

        res.status(201).json(user)

    } catch (error){
        return res.status(400).send(error.message)
    }
}

const signin = async (req, res) =>{
    try{
        const {email, password} = req.body;

        const user = await models.findOne({where: {email: email}});

        if(user && (await bcrypt.compare(password, user.password))){
            const accessToken = jwt.sign(
                {id: user.id, email},
                "ilja-secret-key",
                {
                    expiresIn: "15m"
                }
            );
            const refreshToken = jwt.sign(
                {id: user.id, email},
                "ilja-secret-key-refresh-token",
                {
                    expiresIn: "30d"
                }
            );

            res.cookie("access_token", accessToken, {httpOnly: true, maxAge: 15 * 60 * 1000})

            res.cookie("refresh_token", refreshToken, {httpOnly: true, maxAge: 30000 * 60 * 60 * 24})

            await updateUserAuth(user.id, Date.now(), req.socket.remoteAddress, req.get('User-Agent'), accessToken)

            res.status(200).json(user);
        }
        else{
            res.status(400).send("Invalid Credentials")
        }

    }catch (error){
        return res.status(400).send(error.message)
    }
}
const logout = async (req, res) =>{
    try{
        await createLogoutAt(req.user.id, Date.now(), req.cookies.access_token)
        res.clearCookie("access_token")
        res.clearCookie("refresh_token")
        await req.user.save();

    }catch (error){
        res.status(500).send(error)
    }
}

module.exports = {
    signup,
    signin,
    logout
}