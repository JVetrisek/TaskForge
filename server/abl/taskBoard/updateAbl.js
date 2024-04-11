const Ajv = require('ajv')
const ajv = new Ajv();

const taskBoardDao = require("../../dao/taskBoard-dao.js");

const taskBoardSchema = {
    type: "object",
    properties: {
        id: { type: "string"},
        title: {type: "string"},
        associatedUsersIdList: {type: []},
        ownerId: {type: "string"},
    },
    required: ["id"],
    additionalProperties: false,
};

async function UpdateTaskBoard(req, res){
    try{
        let taskBoard = req.body

        const valid = ajv.validate(taskBoardSchema, taskBoard)
        if(!valid){
            res.status(400).json({
                reqtaskBoard: "dtoIn is not valid",
            });
            return;
        }

        const updatedTaskBoard = taskBoardDao.update(taskBoard)

        if(!updatedTaskBoard){
            res.status(404).json({
                message: `taskBoard ${taskBoard.id} not found`
            })
        }

        res.json(UpdatetaskBoard);
    } catch(error){
        res.status(500).json({message: e.message})
    }
}

module.exports = UpdateTaskBoard;