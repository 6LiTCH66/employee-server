const jwt = require('jsonwebtoken')
require("dotenv").config();
const bcrypt = require('bcryptjs')
const models = require('../model/user.model')
const {createUserAuth, createLogoutAt, updateToken} = require("./user_auth.controller");
const {validationResult} = require('express-validator')

const mailjet = require("node-mailjet").connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)


const sendMail = (email) => {
    const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
            "Messages":[
                {
                    "From": {
                        "Email": "ilja200303@gmail.com",
                        "Name": "Ilja"
                    },
                    "To": [
                        {
                            "Email": email,
                            "Name": "Customer"
                        }
                    ],
                    "Subject": "Greetings from Mailjet.",
                    "TextPart": "My first Mailjet email",
                    "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
                    "CustomID": "AppGettingStartedTest"
                }
            ]
        })
    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
}

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

        sendMail(email)

        res.status(200).send({
            message: "success"
        })


    } catch (error){
        return res.status(400).send(error.message)
    }
}

const changePassword = async (req, res) => {
    try {
        const {email, password, newPassword} = req.body;
        const user = await models.findOne({where: {email: email}})
        // check if the user is exist in the database
        if (user && (await bcrypt.compare(password, user.password))){
            encryptedNewPassword = await bcrypt.hash(newPassword, 10);
            // check if a new password is different from the old one
            if (!await bcrypt.compare(password, encryptedNewPassword)){
                // if it does update the password to the new one
                await models.update(
                    {
                        password: encryptedNewPassword
                    },
                    {where: {email: email}}
                )
                res.status(200).send({
                    message: "Password was successfully changed"
                })

            }else{
                res.status(400).send("The password must be different from the current password")
            }

        }
        else{
            res.status(400).send("Invalid Credentials")
        }

    }catch (error){
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
            // secure to true
            res.cookie("access_token", accessToken, {httpOnly: true, maxAge: 15 * 60 * 1000, overwrite: true, sameSite: "none", secure: true})

            await createUserAuth(user.id, Date.now(),null, req.socket.remoteAddress, req.get('User-Agent'), accessToken, true)

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
    token,
    changePassword
}