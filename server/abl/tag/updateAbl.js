const Ajv = require('ajv')
const ajv = new Ajv();

const categoryDao = require("../../dao/category-dao.js");

const categorySchema = {
    type: "object",
    properties: {
        id: { type: "string"},
        title: {type: "string"},
        color: {type: "string"},
        taskBoardId: {type: "string"},
    },
    required: ["id"],
    additionalProperties: false,
};


async function UpdateCategory(req, res){
    try{
        let category = req.body
        
        const valid = ajv.validate(categorySchema, category)
        if(!valid){
            res.status(400).json({
                reqCategory: "dtoIn is not valid",
            });
            return;
        }

        const updatedCategory = categoryDao.update(category)

        if(!updatedCategory){
            res.status(404).json({
                message: `Category ${category.id} not found`
            })
        }

        res.json(UpdateCategory);
    } catch(error){
        res.status(500).json({message: e.message})
    }
}

module.exports = UpdateCategory;