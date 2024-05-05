const categoryDao = require("../../dao/category-dao.js");
const taskBoardDao = require("../../dao/taskBoard-dao.js");

async function listByTaskBoard(req, res){
    try{

        const reqParam = req.query?.taskBoardId ? req.query : req.body;

        // TaskBoard existence
        const taskBoardValidation = taskBoardDao.get(reqParam.taskBoardId);
        if (!taskBoardValidation){
            res.status(404).json({
                code: "taskBoardNotFound",

                message: `TaskBoard ${req.taskBoardId} not found`
              });
              return;
        }

        const categoryList = categoryDao.listByTaskBoard(reqParam.taskBoardId);
        res.json(categoryList);
    } catch (error){
        res.status(500).json({ message: error.message})
    }
}

module.exports = listByTaskBoard;