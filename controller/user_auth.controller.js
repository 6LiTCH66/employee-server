const models = require("../model/user_auth.model")


const createUserAuth = async (login_at, ip, agent, token) =>{
    await models.create(
        {
            login_at,
            ip,
            agent,
            token
        }
    )
}
const updateUserAuth = async(user_id, login_at, ip, agent, token) => {
    await models.update(
        {
            login_at,
            ip,
            agent,
            token
        },
        {where: {user_id: user_id},}
    )

}
const createLogoutAt = async (user_id, logout_at, token) => {
    await models.update(
        {
            logout_at,
            token
        },
        {where: {user_id: user_id},}
    )
}

module.exports = {
    createUserAuth,
    updateUserAuth,
    createLogoutAt
}