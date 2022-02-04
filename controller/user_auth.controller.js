const models = require("../model/user_auth.model")


const createUserAuth = async (user_id,login_at, logout_at, ip, agent, token, isOnline) =>{
    await models.findOne({where: {user_id: user_id}}).then((user) => {
        if(!user){
            models.create(
                {
                    user_id,
                    login_at,
                    logout_at,
                    ip,
                    agent,
                    token,
                    isOnline
                }
            )
        }
        else{
            models.update(
                {
                    login_at,
                    logout_at,
                    ip,
                    agent,
                    token,
                    isOnline
                },{where: {user_id: user.user_id}}
            )
        }
    })


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

const updateIsOnline = async (user_id, logout_at,isOnline) => {
    await models.update(
        {
            logout_at,
            isOnline
        },
        {where: {user_id: user_id},}
    )
}


const getAuthUsers = async (req, res) => {
    try{
        const authUsers = await models.findAll();
        authUsers.map(async function (user) {
            if (user.logout_at === null && new Date(user.updatedAt).getTime() < new Date().getTime() - 840000) {
                await updateIsOnline(user.user_id, Date.now(), false)
            }
        })

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