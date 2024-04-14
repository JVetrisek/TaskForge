const Ajv = require('ajv')
const ajv = new Ajv();

const categoryDao = require("../../dao/category-dao.js");
const taskBoardDao = require("../../dao/taskBoard-dao.js");

// Dodělat: kontrola že user má přístup k taskboardu, kontrola, že taskboard existuje

const categorySchema = {
    type: "object",
    properties: {
        id: { type: "string"},
        title: {type: "string"},
        taskBoardId: {type: "string"},
    },
    required: ["id", "title", "taskBoardId"],
    additionalProperties: false,
};

async function UpdateCategory(req, res){
    try{
        let category = req.body

        const valid = ajv.validate(categorySchema, category)
        if(!valid){
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.error
            });
            return;
        }

        const taskBoardValidity = taskBoardDao.get(category.taskBoardId);
        if(!taskBoardValidity){
            res.status(400).json({
                code: "taskBoardNotFound",
                message: `TaskBoard: ${category.taskBoardId} does not exists`
            })
            return;
        }

        const updatedCategory = categoryDao.update(category)

        if(!updatedCategory){
            res.status(404).json({
                code: "categoryUpdateFail",
                message: `Category ${category.id} not found`
            })
        }

        res.json(updatedCategory);
    } catch(error){
        res.status(500).json({message: e.message})
    }
}

module.exports = UpdateCategory;