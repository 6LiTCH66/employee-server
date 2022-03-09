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
const getVastused = async (req, res) => {
    try{
        const vastused = await models.findAll()
        return res.status(201).json(vastused)
    }catch (error){
        return res.status(500).json({error:error.message})
    }
}

const updateVastused = async (req, res) => {
    try{
        const { vastusedId } = req.params;
        const [updated] = await models.update(req.body, {
            where : {id: vastusedId}
        });

        if (updated){
            const updatedVastused = await models.findOne({where:{id: vastusedId}});
            return res.status(200).json({vastused: updatedVastused})
        }
        throw new Error('Vastused not found');
    }catch (error){
        return res.status(500).send(error.message)
    }
}
module.exports = {
    createVastused,
    getVastused,
    updateVastused
}

