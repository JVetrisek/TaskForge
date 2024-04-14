const Ajv = require('ajv')
const ajv = new Ajv();

const taskDao = require("../../dao/task-dao.js");

const taskSchema = {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
};

async function Deletetask(req, res){
    try{
        const reqTask = req.query?.id ? req.query : req.body;

        const valid = ajv.validate(taskSchema, reqTask);
        if (!valid){
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.error,
            });
            return;
        }

        const task = taskDao.get(reqTask.id);
        if (!task){
            res.status(404).json({
                code: "taskNotFound",
                message: `task ${reqTask} not found`
              });
              return;
        }

        taskDao.remove(reqTask.id);
        res.json({});
    } catch(e){
        res.status(500).json({message: e.message})
    }
}

module.exports = Deletetask;