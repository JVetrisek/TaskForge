const Ajv = require('ajv')
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const taskDao = require("../../dao/task-dao.js");
const taskBoardDao = require("../../dao/taskBoard-dao.js");
const categoryDao = require("../../dao/category-dao.js");

const taskSchema = {
    type: "object",
    properties: {
        id: { type: "string"},
        title: {type: "string"},
        description: {type: "string"},
        completionDate: { type: "string", format: "date-time" },
        taskBoardId: {type: "string"},
        categoryId: {type: "string"},
        tagList: {type: "array"},
    },
    required: ["id"],
    additionalProperties: false,
};

async function UpdateTask(req, res){
    try{
        let task = req.body

        const valid = ajv.validate(taskSchema, task);
        if (!valid) {
          res.status(400).json({
            code: "dtoInIsNotValid",
            message: "dtoIn is not valid",
            validationError: ajv.error,
          });
          return;
        }

        const taskBoardValidation = taskBoardDao.get(task.taskBoardId);
        if (!taskBoardValidation){
            res.status(404).json({
                code: "dtioInTaskBoardIdNotExists",
                message: `TaskBoard ${task.taskBoardId} does not exists`,
                validationError: ajv.error
            });
            return;
        }

        const categoryValidation = categoryDao.get(task.categoryId);
        if (!categoryValidation){
            res.status(404).json({
                code: "dtioInCategoryIdNotExists",
                message: `Category ${task.categoryId} does not exists`,
                validationError: ajv.error
            });
            return;
        }

        const updatedTask = taskDao.update(task)

        if(!updatedTask){
            res.status(404).json({
                code: "operationFailed",
                message: `taskBoard ${task.id} not found`
            })
        }

        res.json(updatedTask);
    } catch(error){
        res.status(500).json({message: e.message})
    }
}

module.exports = UpdateTask;