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
        const reqTaskBoard =  req.query?.id ? req.query : req.body;

        const valid = ajv.validate(taskBoardSchema, reqTaskBoard);
        if (!valid){
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.error,
            });
            return;
        }

        taskBoardDao.remove(reqTaskBoard.id);
        res.json({});
    } catch(e){
        res.status(500).json({message: e.message})
    }
}

module.exports = DeletetaskBoard;