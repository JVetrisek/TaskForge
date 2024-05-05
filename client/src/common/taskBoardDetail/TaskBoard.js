import "./taskboard.css";
import { TaskBoardContext } from "./TaskBoardContext.js"
import { useContext, useState } from "react";

import { CategoryListContext } from "../categoryCard/CategoryListContext.js";
import CategoryCard from "../categoryCard/CategoryCard.js";

import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

import CategoryForm from "../categoryForm/CategoryForm.js";


function TaskBoard({}){
    const {taskBoard} = useContext(TaskBoardContext);
    const {categoryList} = useContext(CategoryListContext);
    const [showCategoryForm, setShowCategoryForm] = useState(false);

    return(
        <div>
            <div className="taskBoardHeader">
                <h1>{taskBoard.title}</h1>
                <h4 onClick={() => setShowCategoryForm(true)}>New category <Icon className="plusIco" path={mdiPlus} size={1}/></h4>
            </div>
            <div className="categoryList">
                {
                    categoryList.map((category)=>{
                        return(
                            <CategoryCard key={category.id} category={category}/>
                        )
                    })
                }
            </div>
            {!!showCategoryForm && (
                <CategoryForm
                    setShowCategoryForm={setShowCategoryForm}
                    taskBoardId={taskBoard}
                />
            )}
        </div>
    )
}

export default TaskBoard;