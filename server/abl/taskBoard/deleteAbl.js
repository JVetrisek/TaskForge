const Ajv = require('ajv')
const ajv = new Ajv();

const taskBoardDao = require("../../dao/taskBoard-dao.js");

const taskBoardSchema = {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
};

async function DeletetaskBoard(req, res){
    try{
        const reqtaskBoard = req.body

        const valid = ajv.validate(taskBoardSchema, reqtaskBoard);
        if (!valid){
            res.status(400).json({
                reqtaskBoard: "dtoIn is not valid",
            });
            return;
        }

        taskBoardDao.remove(reqtaskBoard.id);
        res.json({});
    } catch(e){
        res.status(500).json({message: e.message})
    }
}

module.exports = DeletetaskBoard;