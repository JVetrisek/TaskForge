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

async function GetCategory (req, res){
    try{
        const reqCategory = req.id

        const valid = ajv.validate(categorySchema, reqCategory)
        if (!valid){
            res.status(400).json({
                reqCategory: "dtoIn is not valid",
            });
            return;
        }

        const category = categoryDao.get(reqCategory.id);
        if (!category){
            res.status(404).json({
                reqCategory: `Category ${reqCategory} not found`
              });
              return;
        }

        res.json(category)
    } catch(e){
        res.status(500).json({message: e.message});
    }
}

module.exports = GetCategory;