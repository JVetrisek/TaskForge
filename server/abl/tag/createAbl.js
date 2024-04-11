const Ajv = require("ajv");
const ajv = new Ajv();

const tagDao = require("../../dao/tag-dao.js");

const tagSchema = {
    type: "object",
    properties: {
        title: {type: "string"},
        color: {type: "string"},
        taskBoardId: {type: "string"},
    },
    additionalProperties: false,
};

let testTag ={
    title: "TestTest",
    color: "#dfdf88",
    taskBoardId: "55fd5f5df",
}

async function Createtag(req, res){
    try {
        //let newtag = req.body;
        let newtag = testTag;

        const valid = ajv.validate(tagSchema, newtag);
        if (!valid) {
          res.status(400).json({
            newtag: "dtoIn is not valid",
          });
          return;
        }

        newtag = tagDao.create(newtag);
        res.json(newtag);
    }   catch (e){
        res.status(500).json({ message: e.message});
    }
}

module.exports = Createtag;