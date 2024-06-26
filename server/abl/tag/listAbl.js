const tagDao = require("../../dao/tag-dao.js");

async function ListAbl(req, res){
    try{
        const tagList = tagDao.list();
        res.json(tagList);
    } catch (e){
        res.status(500).json({ message: e.message})
    }
}

module.exports = ListAbl;