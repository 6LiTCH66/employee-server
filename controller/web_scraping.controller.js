const models = require("../model/web_scraping.model")
const createVastused = async (req, res) => {
    try{
        const vastused = await models.create(req.body)
        return res.status(201).json({
            vastused
        })
    }catch (error){
        return res.status(500).json({error: error})
    }
}
module.exports = {
    createVastused
}
