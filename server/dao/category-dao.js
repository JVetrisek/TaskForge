const fs = require('fs')
const path = require('path')
const crypto = require('crypto');

const FolderPath = path.join(__dirname, "storage", "categoryList");

// Method for creating category
function create(category){
    try{
        category.id = crypto.randomBytes(16).toString("hex");
        const filePath = path.join(FolderPath, `${category.id}.json`);
        const fileData = JSON.stringify(category);
        fs.writeFileSync(filePath, fileData, "utf8");
        return category;
    } catch (error){
        throw {code: "creatingFailed", message: error.message};
    }
};

// Method for removing category
function remove(categoryId){
    try{
        const filePath = path.join(FolderPath, `${categoryId}.json`);
        fs.unlinkSync(filePath);
        return {};
    } catch(error){
        throw { error: "operation failed"}
    }
}

// Method for getting category
function get(categoryId){
    try{
        const filePath = path.join(FolderPath, `${categoryId}.json`)
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileData);
    } catch(error){
        throw { error: "operation failed"}
    }
}

// Method for updating category
function update(category){
    try {
        const currentcategory = get(category.id);
        if (!currentcategory) return null;
        const newcategory = { ...currentcategory, ...category}
        const filePath = path.join(FolderPath, `${category.id}.json`)
        const fileData = JSON.stringify(newcategory);
        fs.writeFileSync(filePath, fileData, "utf8");
        return newcategory;
    } catch(error){
        throw { error: "operation failed"}
    }
}

// Method for listing categories
function list(){
    try{
        const files = fs.readdirSync(FolderPath);
        const categoryList = files.map((file) => {
            const fileData = fs.readFileSync(path.join(FolderPath, file), "utf8");
            return JSON.parse(fileData)
        })
        return categoryList
    } catch(error){
        throw { error: "operation failed"}
    }
}

// Method for listing categories by taskBoard
function listByTaskBoard(taskBoardId){
    try{
        const files = fs.readdirSync(FolderPath);

        const taskBoardCategoryList = [];

        for (const file of files) {
            const fileData = fs.readFileSync(path.join(FolderPath, file), "utf8");
            const category = JSON.parse(fileData);

            if (category.taskBoardId === taskBoardId) {
              taskBoardCategoryList.push(category);
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
    listByTaskBoard,
};