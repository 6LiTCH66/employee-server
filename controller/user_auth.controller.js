const models = require("../model/user_auth.model")


const createUserAuth = async (user_id,login_at, ip, agent, token, isOnline) =>{
    await models.create(
        {
            user_id,
            login_at,
            ip,
            agent,
            token,
            isOnline
        }
    )
}

// const updateUserAuth = async(user_id, login_at, ip, agent, token, isOnline) => {
//     await models.update(
//         {
//             login_at,
//             ip,
//             agent,
//             token,
//             isOnline
//         },
//         {where: {user_id: user_id},}
//     )
//
// }

const createLogoutAt = async (user_id, logout_at, token, isOnline) => {
    await models.update(
        {
            logout_at,
            token,
            isOnline
        },
        {where: {user_id: user_id},}
    )
}

const updateToken = async (user_id, token, isOnline) => {
    await models.update(
        {
            token,
            isOnline
        },
        {where: {user_id: user_id},}
    )
}

// const updateIsOnline = async (user_id, isOnline) => {
//     await models.update(
//         {
//             isOnline
//         },
//         {where: {user_id: user_id},}
//     )
// }


const getAuthUsers = async (req, res) => {
    try{
        const authUsers = await models.findAll();
        return res.status(201).json(authUsers);

    }catch (error){
        return res.status(500).json({error: error.message})
    }
}

module.exports = {
    createUserAuth,
    createLogoutAt,
    updateToken,
    getAuthUsers
}