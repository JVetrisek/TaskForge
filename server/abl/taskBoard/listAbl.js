const taskBoardDao = require("../../dao/taskBoard-dao.js");

async function ListAbl(req, res){
    try{
        const taskBoardList = taskBoardDao.list();
        res.json(taskBoardList);
    } catch (e){
        res.status(500).json({ message: e.message})
    }
}

module.exports = ListAbl;