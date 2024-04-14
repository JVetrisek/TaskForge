const Ajv = require("ajv");
const ajv = new Ajv();

const taskBoardDao = require("../../dao/taskBoard-dao.js");
const userDao = require("../../dao/user-dao.js");

const taskBoardSchema = {
    type: "object",
    properties: {
        title: {type: "string"},
        ownerId: {type: "string"},
    },
    required: ["title", "ownerId"],
    additionalProperties: false,
};


async function CreateTaskBoard(req, res){
    try {
        let newTaskBoard = req.body;

        // input schema validation
        const valid = ajv.validate(taskBoardSchema, newTaskBoard);
        if (!valid) {
          res.status(400).json({
            code: "dtoInIsNotValid",
            message: "dtoIn is not valid",
            validationError: ajv.error,
          });
          return;
        }

        // input owner validation
        const userExistence = userDao.get(newTaskBoard.ownerId);
        if (!userExistence){
            res.status(400).json({
                code: "ownerNotFound",
                message: `User ${newTaskBoard.ownerId} does not exist`
            })
            return;
        }

        newTaskBoard = taskBoardDao.create(newTaskBoard);
        res.json(newTaskBoard);
    }   catch (e){
        res.status(500).json({ message: e.message});
    }
}

module.exports = CreateTaskBoard;