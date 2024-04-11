const Ajv = require('ajv')
const ajv = new Ajv();

const categoryDao = require("../../dao/category-dao.js");

const categorySchema = {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
};

async function DeleteCategory(req, res){
    try{
        const reqCategory = req.body

        const valid = ajv.validate(categorySchema, reqCategory);
        if (!valid){
            res.status(400).json({
                reqCategory: "dtoIn is not valid",
            });
            return;
        }

        categoryDao.remove(reqCategory.id);
        res.json({});
    } catch(e){
        res.status(500).json({message: e.message})
    }
}

module.exports = DeleteCategory;