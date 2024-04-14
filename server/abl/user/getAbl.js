const Ajv = require('ajv')
const ajv = new Ajv();

const userDao = require("../../dao/user-dao.js");

const userSchema = {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
};


async function GetUser (req, res){
    try{
        const reqUser = req.query?.id ? req.query : req.body;

        // input validation
        const valid = ajv.validate(userSchema, reqUser)
        if (!valid){
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        // get user by id
        const user = userDao.get(reqUser.id);
        if (!user){
            res.status(404).json({
                reqUser: `user ${reqUser} not found`
              });
              return;
        }

        res.json(user)
    } catch(e){
        res.status(500).json({message: e.message});
    }
}

module.exports = GetUser;