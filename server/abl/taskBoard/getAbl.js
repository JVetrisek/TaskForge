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

async function GetTaskBoard (req, res){
    try{
        const reqTaskBoard = req.query?.id ? req.query : req.body;

        const valid = ajv.validate(taskBoardSchema, reqTaskBoard)
        if (!valid){
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.error,
            });
            return;
        }

        const taskBoard = taskBoardDao.get(reqTaskBoard.id);
        if (!taskBoard){
            res.status(404).json({
                code: "taskBoardNotFound",
                message: `taskBoard ${reqTaskBoard} not found`
              });
              return;
        }

        res.json(taskBoard)
    } catch(e){
        res.status(500).json({message: e.message});
    }
}

module.exports = GetTaskBoard;