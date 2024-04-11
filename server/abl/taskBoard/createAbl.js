const Ajv = require("ajv");
const ajv = new Ajv();

const taskBoardDao = require("../../dao/taskBoard-dao.js");
//const userDao = require("../../dao/user-dao.js");

const taskBoardSchema = {
    type: "object",
    properties: {
        title: {type: "string"},
        //associatedUserIDList: {type: []},
        ownerId: {type: "string"},
    },
    additionalProperties: false,
};

const testTaskBoard = {
        title: "TestTaskBoard",
        //associatedUserIDList: [1,2,3,4],
        ownerId: "1",
};

async function CreateTaskBoard(req, res){
    try {
        //let newTaskBoard = req.body;
        let newTaskBoard = testTaskBoard;

        // input schema validation
        const valid = ajv.validate(taskBoardSchema, newTaskBoard);
        if (!valid) {
          res.status(400).json({
            newTaskBoard: "dtoIn is not valid",
          });
          return;
        }

        // input user validation
/*         const userExistence = userDao.get(req.ownerId);
        if (!userExistence){
            res.status(400).json({
                code: "ownerNotFound",
                message: `User ${req.ownerId} does not exist`
            })
            return;
        } */

        newTaskBoard = taskBoardDao.create(newTaskBoard);
        res.json(newTaskBoard);
    }   catch (e){
        res.status(500).json({ message: e.message});
    }
}

module.exports = CreateTaskBoard;