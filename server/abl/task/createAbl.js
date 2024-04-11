const Ajv = require("ajv");
const ajv = new Ajv();

const taskDao = require("../../dao/task-dao.js");

const taskSchema = {
    type: "object",
    properties: {
        title: {type: "string"},
        description: {type: "string"},
        //completionDate: {type: Date},
        taskBoardId: {type: "string"},
        categoryId: {type: "string"},
        //TagList: []
    },
    additionalProperties: false,
};


async function Createtask(req, res){
    try {
        let newtask = req.body;

        const valid = ajv.validate(taskSchema, newtask);
        if (!valid) {
          res.status(400).json({
            newtask: "dtoIn is not valid",
          });
          return;
        }

        newtask = taskDao.create(newtask);
        res.json(newtask);
    }   catch (e){
        res.status(500).json({ message: e.message});
    }
}

module.exports = Createtask;