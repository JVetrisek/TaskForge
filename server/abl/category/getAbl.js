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

// Dodělat: kontrola že user má přístup k taskboardu

async function GetCategory (req, res){
    try{
        const reqCategory = req.query?.id ? req.query : req.body;

        const valid = ajv.validate(categorySchema, reqCategory)
        if (!valid){
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.error
            });
            return;
        }

        const category = categoryDao.get(reqCategory.id);
        if (!category){
            res.status(404).json({
                code: "categoryNotFound",
                message: `Category ${reqCategory} not found`
              });
              return;
        }

        res.json(category)
    } catch(e){
        res.status(500).json({message: e.message});
    }
}

module.exports = GetCategory;