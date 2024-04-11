const Ajv = require('ajv')
const ajv = new Ajv();

const taskDao = require("../../dao/task-dao.js");

const taskSchema = {
    type: "object",
    properties: {
        id: { type: "string"},
        title: {type: "string"},
        description: {type: "string"},
        //completionDate: {type: Date},
        taskBoardId: {type: "string"},
        categoryId: {type: "string"},
        //TagList: []
    },
    required: ["id"],
    additionalProperties: false,
};

//TestData
/* const testtask = {
    title: "BUMBUMTest",
	taskBoardId: "123456",
	id: "58c40770861c469dd97dd5a2d25e46c5"
} */

async function Updatetask(req, res){
    try{
        let task = req.body
        //let task = testtask

        const valid = ajv.validate(taskSchema, task)
        if(!valid){
            res.status(400).json({
                reqtask: "dtoIn is not valid",
            });
            return;
        }

        const updatedtask = taskDao.update(task)

        if(!updatedtask){
            res.status(404).json({
                message: `task ${task.id} not found`
            })
        }

        res.json(Updatetask);
    } catch(error){
        res.status(500).json({message: e.message})
    }
}

module.exports = Updatetask;