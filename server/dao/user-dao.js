const fs = require('fs')
const path = require('path')

const FolderPath =  path.join(__dirname, "storage", "userList")

// get method
function get(userId){
    try{
        const filePath = path.join(FolderPath, `${userId}.json`);
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileData)
    } catch(error){
        if (error.code === "ENOENT") return null;
        throw {code: "filedToGetUser", message: error.message};
    }
}

// list method
function list(){
    try{
        const files = fs.readdirSync(FolderPath)
        const userList = files.map((file) => {
            const fileData = fs.readFileSync(path.join(FolderPath, file), "utf8");
            return JSON.parse(fileData);
        });
        return userList;
    } catch (error){
        throw { code: "failedToListusers", message: error.message};
    }
}

module.exports = {
    get,
    list,
}