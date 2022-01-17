const models = require("../model/user_auth.model")


const createUserAuth = (login_at, ip, agent, token) =>{
    models.create({
        login_at,
        ip,
        agent,
        token
    })
}
const updateUserAuth = (user_id, login_at, ip, agent, token) => {
    models.update({login_at,
        ip,
        agent,
        token},
        {where: {user_id: user_id},}
    )

}
const updateLogoutAt = (user_id, logout_at) => {
    models.update(
        {logout_at},
        {where: {user_id: user_id},}
    )
}

module.exports = {
    createUserAuth,
    updateUserAuth,
    updateLogoutAt
}