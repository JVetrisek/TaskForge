const Ajv = require('ajv')
const ajv = new Ajv();

const tagDao = require("../../dao/tag-dao.js");

const tagSchema = {
    type: "object",
    properties: {
        id: { type: "string"},
        title: {type: "string"},
        color: {type: "string"},
        taskBoardId: {type: "string"},
    },
    required: ["id"],
    additionalProperties: false,
};


async function UpdateTag(req, res){
    try{
        let tag = req.body
        
        const valid = ajv.validate(tagSchema, tag)
        if(!valid){
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.error
            });
            return;
        }

        const updatedTag = tagDao.update(tag)

        if(!updatedTag){
            res.status(404).json({
                message: `Tag ${tag.id} not found`
            })
        }

        res.json(updatedTag);
    } catch(error){
        res.status(500).json({message: e.message})
    }
}

module.exports = UpdateTag;