const tagDao = require("../../dao/tag-dao.js");
const taskBoardDao = require("../../dao/taskBoard-dao.js");

async function listByTaskBoard(req, res){
    try{
        const reqParam = req.query?.taskBoardId ? req.query : req.body;

        // TaskBoard existence
        const taskBoardValidation = taskBoardDao.get(reqParam.taskBoardId);
        if (!taskBoardValidation){
            res.status(404).json({
                code: "taskBoardNotFound",
                message: `TaskBoard ${reqParam.taskBoardId} not found`
              });
              return;
        }

        const tagList = tagDao.listByTaskBoard(reqParam.taskBoardId);
        res.json(tagList);
    } catch (error){
        res.status(500).json({ message: error.message})
    }
}

module.exports = listByTaskBoard;