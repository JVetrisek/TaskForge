const Ajv = require("ajv");
const ajv = new Ajv();

const categoryDao = require("../../dao/category-dao.js");
const taskBoardDao = require("../../dao/taskBoard-dao.js");

const categorySchema = {
    type: "object",
    properties: {
        title: {type: "string"},
        taskBoardId: {type: "string"},
    },
    required: ["title","taskBoardId"],
    additionalProperties: false,
};

async function CreateCategory(req, res){
    try {
        let newCategory =  req.query?.id ? req.query : req.body

        const valid = ajv.validate(categorySchema, newCategory);
        if (!valid) {
          res.status(400).json({
            code: "dtoInIsNotValid",
            message: "dtoIn is not valid",
            validationError: ajv.error
          });
          return;
        }

        // TaskBoard existence
        const taskBoardValidation = taskBoardDao.get(newCategory.taskBoardId);
        if (!taskBoardValidation){
            res.status(404).json({
                code: "dtioInTaskBoardIdNotExists",
                message: `TaskBoard ${newCategory.taskBoardId} does not exists`,
                validationError: ajv.error
            });
            return;
        }

        newCategory = categoryDao.create(newCategory);
        res.json(newCategory);
    }   catch (error){
        res.status(500).json({ message: error.message});
    }
}

module.exports = CreateCategory;