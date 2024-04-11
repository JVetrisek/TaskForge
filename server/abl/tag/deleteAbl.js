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

async function Deletetag(req, res){
    try{
        const reqtag = req.body

        const valid = ajv.validate(tagSchema, reqtag);
        if (!valid){
            res.status(400).json({
                reqtag: "dtoIn is not valid",
            });
            return;
        }

        tagDao.remove(reqtag.id);
        res.json({});
    } catch(e){
        res.status(500).json({message: e.message})
    }
}

module.exports = Deletetag;