const Ajv = require('ajv')
const ajv = new Ajv();

const categoryDao = require("../../dao/category-dao.js");

const categorySchema = {
    type: "object",
    properties: {
        id: { type: "string"},
        title: {type: "string"},
        taskBoardId: {type: "string"},
    },
    required: ["id"],
    additionalProperties: false,
};

//TestData
/* const testCategory = {
    title: "BUMBUMTest",
	taskBoardId: "123456",
	id: "58c40770861c469dd97dd5a2d25e46c5"
} */

async function UpdateCategory(req, res){
    try{
        let category = req.body
        //let category = testCategory

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