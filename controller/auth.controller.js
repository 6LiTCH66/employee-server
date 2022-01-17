const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const models = require('../model/user.model')
const {createUserAuth, updateUserAuth, updateLogoutAt} = require("./user_auth.controller");
const requestIp = require('request-ip');

const signup = async (req, res) =>{
    try{
        const {email, password} = req.body;

        if(!(email && password)){
            res.status(400).send("All inputs is required");
        }

        const oldUser = await models.findOne({where: {email: email}})

        if(oldUser){
            return res.status(409).send("User already exist. Please Login")
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await models.create({
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        const token = jwt.sign(
            {id: user.id, email},
            "ilja-secret-key",
            {
                expiresIn: "15m",
            }
        );

        createUserAuth(Date.now(), requestIp.getClientIp(req), req.get('User-Agent'), token)

        user.token = token;

        res.status(201).json(user)

    } catch (error){
        return res.status(500).send(error.message)
    }
}

const signin = async (req, res) =>{
    try{
        const {email, password} = req.body;

        if(!(email && password)){
            res.status(400).send("All inputs is required");
        }

        const user = await models.findOne({where: {email: email}});

        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {id: user.id, email},
                "ilja-secret-key",
                {
                    expiresIn: "15m"
                }
            );
            res.cookie("access_token", token, {httpOnly: true, maxAge:900000})

            updateUserAuth(user.id, Date.now(), requestIp.getClientIp(req), req.get('User-Agent'), token)

            user.token = token;

            res.status(200).json(user);
        }
        else{
            res.status(400).send("Invalid Credentials")
        }

    }catch (error){
        return res.status(500).send(error.message)
    }
}
const logout = async (req, res) =>{
    try{
        updateLogoutAt(req.user.id, Date.now())
        res.clearCookie("access_token")
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