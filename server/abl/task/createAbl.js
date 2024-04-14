const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const taskDao = require("../../dao/task-dao.js");
const taskBoardDao = require("../../dao/taskBoard-dao.js");
const categoryDao = require("../../dao/category-dao.js");

const taskSchema = {
    type: "object",
    properties: {
        title: {type: "string"},
        description: {type: "string"},
        completionDate: { type: "string", format: "date-time" },
        taskBoardId: {type: "string"},
        categoryId: {type: "string"},
        tagList: {type: "array"},
    },
    required: ["title", "taskBoardId", "categoryId"],
    additionalProperties: false,
};


async function Createtask(req, res){
    try {
        let newTask = req.body;

        const valid = ajv.validate(taskSchema, newTask);
        if (!valid) {
          res.status(400).json({
            code: "dtoInIsNotValid",
            message: "dtoIn is not valid",
            validationError: ajv.error,
          });
          return;
        }

        const taskBoardValidation = taskBoardDao.get(newTask.taskBoardId);
        if (!taskBoardValidation){
            res.status(404).json({
                code: "dtioInTaskBoardIdNotExists",
                message: `TaskBoard ${newTask.taskBoardId} does not exists`,
                validationError: ajv.error
            });
            return;
        }

        const categoryValidation = categoryDao.get(newTask.categoryId);
        if (!categoryValidation){
            res.status(404).json({
                code: "dtioInCategoryIdNotExists",
                message: `Category ${newTask.categoryId} does not exists`,
                validationError: ajv.error
            });
            return;
        }

        newTask = taskDao.create(newTask);
        res.json(newTask);
    }   catch (e){
        res.status(500).json({ message: e.message});
    }
}

module.exports = Createtask;