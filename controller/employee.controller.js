const db = require("../database")
const models = require("../model/employee.model")
const createEmployee = async (req,res) => {
    try{
        const employee = await models.create(req.body)
        return res.status(201).json({
            employee
        });
    }catch (error){
        return res.status(500).json({error: error.message})
    }
}

const getEmployees = async (req, res) => {
    try{
        const employees = await models.findAll();
        return res.status(201).json(employees);
    } catch (error){
        return res.status(500).json({error: error.message})
    }
}

const updateEmployee = async (req, res) => {
    try{
        const { employeeId } = req.params;
        const [updated] = await models.update(req.body, {
            where : {id: employeeId}
        });
        if(updated){
            const updatedEmployee = await models.findOne({where: { id: employeeId}});
            return res.status(200).json({employee: updatedEmployee});
        }
        throw new Error('Employee not found');
    }catch (error){
        return res.status(500).send(error.message)
    }
}

const deleteEmployee = async (req, res) => {
    try{
        const { employeeId } = req.params;
        const deleted = await models.destroy({
            where :{id: employeeId}
        });
        if(deleted){
            return res.status(204).send("Employee deleted");
        }
        throw new Error("Employee not found");
    }catch (error){
        return res.status(500).send(error.message);

    }
}
module.exports = {
    createEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee
}