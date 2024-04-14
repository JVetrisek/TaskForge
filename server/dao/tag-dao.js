const fs = require('fs')
const path = require('path')
const crypto = require('crypto');

const FolderPath = path.join(__dirname, "storage", "tagList");

// Method for creating tag
function create(tag){
    try{
        tag.id = crypto.randomBytes(16).toString("hex");
        const filePath = path.join(FolderPath, `${tag.id}.json`);
        const fileData = JSON.stringify(tag);
        fs.writeFileSync(filePath, fileData, "utf8");
        return tag;
    } catch (error){
        throw {code: "creatingFailed", message: error.message};
    }
};

// Method for removing tag
function remove(tagId){
    try{
        const filePath = path.join(FolderPath, `${tagId}.json`);
        fs.unlinkSync(filePath);
        return {};
    } catch(error){
        throw { error: "operation failed"}
    }
}

// Method for getting tag
function get(tagId){
    try{
        const filePath = path.join(FolderPath, `${tagId}.json`)
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileData);
    } catch(error){
        throw { error: "operation failed"}
    }
}

// Method for updating tag
function update(tag){
    try {
        const currenttag = get(tag.id);
        if (!currenttag) return null;
        const newtag = { ...currenttag, ...tag}
        const filePath = path.join(FolderPath, `${tag.id}.json`)
        const fileData = JSON.stringify(newtag);
        fs.writeFileSync(filePath, fileData, "utf8");
        return newtag;
    } catch(error){
        throw { error: "operation failed"}
    }
}

// Method for listing categories
function list(){
    try{
        const files = fs.readdirSync(FolderPath);
        const tagList = files.map((file) => {
            const fileData = fs.readFileSync(path.join(FolderPath, file), "utf8");
            return JSON.parse(fileData)
        })
        return tagList
    } catch(error){
        throw { error: "operation failed"}
    }
}

function listByTaskBoard(taskBoardId){
    try{
        const files = fs.readdirSync(FolderPath);

        const taskBoardCategoryList = [];

        for (const file of files) {
            const fileData = fs.readFileSync(path.join(FolderPath, file), "utf8");
            const tag = JSON.parse(fileData);

            if (tag.taskBoardId === taskBoardId) {
              taskBoardCategoryList.push(tag);
            }
          }

        return taskBoardCategoryList;
    }catch (error) {
        throw { code: "filterFailed", message: error.message };
    }
};

module.exports = {
    create,
    remove,
    get,
    update,
    list,
    listByTaskBoard
};