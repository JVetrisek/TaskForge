const categoryDao = require("../../dao/category-dao.js");
const taskDao = require("../../dao/task-dao.js");

async function listByCategory(req, res){
    try{
        const reqParam = req.query?.categoryId ? req.query : req.body;

        const categoryValidation = categoryDao.get(reqParam.categoryId);
        if (!categoryValidation){
            res.status(404).json({
                code: "categoryNotFound",
                message: `Category ${req.categoryId} not found`
              });
              return;
        }

        const taskList = taskDao.listByCategory(reqParam.categoryId);
        res.json(taskList);
    } catch (error){
        res.status(500).json({ message: error.message})
    }
}

module.exports = listByCategory;