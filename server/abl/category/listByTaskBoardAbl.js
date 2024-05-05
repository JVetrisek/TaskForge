const categoryDao = require("../../dao/category-dao.js");
const taskBoardDao = require("../../dao/taskBoard-dao.js");

async function listByTaskBoard(req, res){
    try{
<<<<<<< HEAD
        const reqParam = req.query?.taskBoardId ? req.query : req.body;
=======
        const reqParam = req.query?.id ? req.query : req.body;
>>>>>>> 5048213d4749f70c9077ae9ab0a5005e6ea62cfd

        // TaskBoard existence
        const taskBoardValidation = taskBoardDao.get(reqParam.taskBoardId);
        if (!taskBoardValidation){
            res.status(404).json({
                code: "taskBoardNotFound",
<<<<<<< HEAD
                message: `TaskBoard ${req.taskBoardId} not found`
=======
                message: `TaskBoard ${reqParam.taskBoardId} not found`
>>>>>>> 5048213d4749f70c9077ae9ab0a5005e6ea62cfd
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