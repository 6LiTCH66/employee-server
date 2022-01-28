const jwt = require('jsonwebtoken')
require("dotenv").config();
const bcrypt = require('bcryptjs')
const models = require('../model/user.model')
const {createUserAuth, createLogoutAt, updateUserAuth, updateToken, updateIsOnline} = require("./user_auth.controller");
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

        await createUserAuth(null, null, null, null, null)

        res.status(200).send({
            message: "success"
        })


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
                process.env.ACCESS_TOKEN,
                {
                    expiresIn: "15m"
                }
            );
            res.cookie("access_token", accessToken, {httpOnly: true, maxAge: 15 * 60 * 1000, overwrite: true, sameSite: "none", secure: true})
            await updateUserAuth(user.id, Date.now(), req.socket.remoteAddress, req.get('User-Agent'), accessToken, true)

            const {password, ...data} = await user.toJSON()

            res.status(200).json(data);
        }
        else{
            res.status(400).send("Invalid Credentials")
        }

    }catch (error){
        return res.status(400).send(error.message)
    }
}

const token = async (req, res) =>{
    const accessToken = req.cookies.access_token;
    try{
        const user = await jwt.verify(accessToken, process.env.ACCESS_TOKEN)

        const newAccessToken = await jwt.sign(
            {id: user.id, email: user.email},
            process.env.ACCESS_TOKEN,
            {
                expiresIn: "15m"
            }
        );

        res.cookie("access_token", newAccessToken, {httpOnly: true, maxAge: 15 * 60 * 1000, overwrite: true, sameSite: "none", secure: true})
        await updateToken(user.id, newAccessToken, true);
        res.status(200).json(user);

    }catch (error){
        const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN, {ignoreExpiration: true} );
        await updateIsOnline(user.id, false)
        return res.status(400).send(error.message)
    }

}

const logout = async (req, res) => {
    try{
        await createLogoutAt(req.user.id, Date.now(), req.cookies.access_token, false)
        res.clearCookie("access_token", {sameSite: "none", secure: true})
        res.status(200).json('User Logged out')

    }catch (error){
        res.status(500).send(error)
    }
}

module.exports = {
    signup,
    signin,
    logout,
    token
}