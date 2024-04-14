const Ajv = require("ajv");
const ajv = new Ajv();

const tagDao = require("../../dao/tag-dao.js");
const taskBoardDao = require("../../dao/taskBoard-dao.js");

const tagSchema = {
    type: "object",
    properties: {
        title: {type: "string"},
        color: {type: "string"},
        taskBoardId: {type: "string"},
    },
    required: ["title", "taskBoardId"],
    additionalProperties: false,
};

async function CreateCategory(req, res){
    try {
        let newTag =  req.query?.id ? req.query : req.body

        const valid = ajv.validate(tagSchema, newTag);
        if (!valid) {
          res.status(400).json({
            code: "dtoInIsNotValid",
            message: "dtoIn is not valid",
            validationError: ajv.error
          });
          return;
        }

        // TaskBoard existence
        const taskBoardValidation = taskBoardDao.get(newTag.taskBoardId);
        if (!taskBoardValidation){
            res.status(404).json({
                code: "dtioInTaskBoardIdNotExists",
                message: `TaskBoard ${newTag.taskBoardId} does not exists`,
                validationError: ajv.error
            });
            return;
        }

        newTag = tagDao.create(newTag);
        res.json(newTag);
    }   catch (error){
        res.status(500).json({ message: error.message});
    }
}

module.exports = CreateCategory;