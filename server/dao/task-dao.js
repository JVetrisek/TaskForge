const fs = require('fs')
const path = require('path')
const crypto = require('crypto');

const FolderPath = path.join(__dirname, "storage", "taskList");

// Method for creating task
function create(task){
    try{
        task.id = crypto.randomBytes(16).toString("hex");
        const filePath = path.join(FolderPath, `${task.id}.json`);
        const fileData = JSON.stringify(task);
        fs.writeFileSync(filePath, fileData, "utf8");
        return task;
    } catch (error){
        throw {code: "creatingFailed", message: error.message};
    }
};

// Method for removing task
function remove(taskId){
    try{
        const filePath = path.join(FolderPath, `${taskId}.json`);
        fs.unlinkSync(filePath);
        return {};
    } catch(error){
        throw { error: "operation failed"}
    }
}

// Method for getting task
function get(taskId){
    try{
        const filePath = path.join(FolderPath, `${taskId}.json`)
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileData);
    } catch(error){
        throw { error: "operation failed"}
    }
}

// Method for updating task
function update(task){
    try {
        const currenttask = get(task.id);
        if (!currenttask) return null;
        const newtask = { ...currenttask, ...task}
        const filePath = path.join(FolderPath, `${task.id}.json`)
        const fileData = JSON.stringify(newtask);
        fs.writeFileSync(filePath, fileData, "utf8");
        return newtask;
    } catch(error){
        throw { error: "operation failed"}
    }
}

// Method for listing tasks
function list(){
    try{
        const files = fs.readdirSync(FolderPath);
        const taskList = files.map((file) => {
            const fileData = fs.readFileSync(path.join(FolderPath, file), "utf8");
            return JSON.parse(fileData)
        })
        return taskList
    } catch(error){
        throw { error: "operation failed"}
    }
}

// Task filter (by category)
function listByCategory(categoryId){
    try{
        const files = fs.readdirSync(FolderPath);

        const categoryTaskList = [];

        for (const file of files) {
            const fileData = fs.readFileSync(path.join(FolderPath, file), "utf8");
            const task = JSON.parse(fileData);

            if (task.categoryId === categoryId) {
                categoryTaskList.push(task);
            }
          }

        return categoryTaskList;
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
    listByCategory,
};