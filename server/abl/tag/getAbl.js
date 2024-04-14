const Ajv = require('ajv')
const ajv = new Ajv();

const tagDao = require("../../dao/tag-dao.js");

const tagSchema = {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
};

async function Gettag (req, res){
    try{
        const reqTag = req.query?.id ? req.query : req.body;

        const valid = ajv.validate(tagSchema, reqTag)
        if (!valid){
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.error
            });
            return;
        }

        const tag = tagDao.get(reqTag.id);
        if (!tag){
            res.status(404).json({
                reqTag: `tag ${reqTag} not found`
              });
              return;
        }

        res.json(tag)
    } catch(e){
        res.status(500).json({message: e.message});
    }
}

module.exports = Gettag;