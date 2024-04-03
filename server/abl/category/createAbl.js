const Ajv = require("ajv");
const ajv = new Ajv();

const categoryDao = require("../../dao/category-dao.js");

const categorySchema = {
    type: "object",
    properties: {
        title: {type: "string"},
        taskBoardId: {type: "string"},
    },
    additionalProperties: false,
};

/* const testData = {
        title: "CrazyTest",
        taskBoardId: "123456",
}; */

async function CreateCategory(req, res){
    try {
        let newCategory = req.body;
        //let newCategory = testData;

        // input validation
        const valid = ajv.validate(categorySchema, newCategory);
        if (!valid) {
          res.status(400).json({
            newCategory: "dtoIn is not valid",
          });
          return;
        }

        newCategory = categoryDao.create(newCategory);
        res.json(newCategory);
    }   catch (e){
        res.status(500).json({ newCategory: e.newCategory});
    }
}

module.exports = CreateCategory;