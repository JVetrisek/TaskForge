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
        const reqCategory = req.query?.id ? req.query : req.body;

        const valid = ajv.validate(categorySchema, reqCategory);
        if (!valid){
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.error
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