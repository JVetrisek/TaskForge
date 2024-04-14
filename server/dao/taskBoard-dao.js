const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const FolderPath =  path.join(__dirname, "storage", "taskBoardList")

// create method
function create(newTaskBoard){
    try{
        newTaskBoard.id = crypto.randomBytes(16).toString("hex");
        const filePath = path.join(FolderPath, `${newTaskBoard.id}.json`);
        const fileData = JSON.stringify(newTaskBoard);
        fs.writeFileSync(filePath, fileData, "utf8");
        return newTaskBoard;
    } catch(error){
        throw { code: "filedCreateTaskBoard", message: error.message}
    }
}

// get method
function get(taskBoardId){
    try{
        const filePath = path.join(FolderPath, `${taskBoardId}.json`);
        const file = fs.readFileSync(filePath, "utf8");
        return JSON.parse(file)
    } catch(error){
        if (error.code === "ENOENT") return null;
        throw {code: "filedToGetTaskBoard", message: error.message};
    }
}


// remove method
function remove(taskBoardId){
    try{
        const filePath = path.join(FolderPath, `${taskBoardId}.json`);
        fs.unlinkSync(filePath);
        return {};
    } catch(error){
        if (error.code = "ENOENT") {
            return null;
        }
        throw {code: "failedToRemoveTaskBoard", message: error.message};
    }
}


// update method
function update(taskBoard) {
    try{
        const currantTaskBoard = get(taskBoard.id);
        if(!currantTaskBoard) return null;
        const updatedTaskBoard = { ...currantTaskBoard, ...taskBoard};
        const filePath = path.join(FolderPath, `${taskBoard.id}.json`);
        const fileData = JSON.stringify(updatedTaskBoard);
        fs.writeFileSync(filePath, fileData, "utf8");
        return updatedTaskBoard;
    }catch(error){
        throw {code: "filedToUpdateTaskBoard"}
    }
}

// list method
function list(){
    try{
        const files = fs.readdirSync(FolderPath)
        const taskBoardList = files.map((file) => {
            const fileData = fs.readFileSync(path.join(FolderPath, file), "utf8");
            return JSON.parse(fileData);
        });
        return taskBoardList;
    } catch (error){
        throw { code: "failedToListTaskBoards", message: error.message};
    }
}

module.exports = {
    create,
    get,
    remove,
    update,
    list
}