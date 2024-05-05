import { useNavigate } from "react-router-dom";
import "./categorycard.css";
import { useEffect } from "react";

import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import { mdiPencil } from '@mdi/js';

import { TaskListContext } from "../TaskList/TaskListContext";

import { useContext, useState } from "react";
import TaskListProvider from "../TaskList/TaskListProvider";
import TaskCard from "../TaskList/TaskCard";
import TaskForm from "../taskForm/TaskForm"

import { CategoryListContext } from "../categoryCard/CategoryListContext.js";
import CategoryForm from "../categoryForm/CategoryForm.js";
import CategoryConfirmDeleteForm from "../categoryForm/CategoryConfirmDeleteForm.js";

function CategoryCard({category}){
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false)
    const [showIcon, setShowIcon] = useState(false);
    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

    const navigate = useNavigate()
    return(
        <TaskListProvider categoryId={category.id}>
            <div className="categoryCard">
                <div className="categoryTitle">
                    <h4  
                        onMouseEnter={() => setShowIcon(true)}
                        onMouseLeave={() => setShowIcon(false)}
                        onClick={() => setShowCategoryForm({})}
                    >
                        {showIcon && (
                            <Icon path={mdiPencil} size={0.7} />
                        )}
                        {category.title}
                    </h4>
                    <Icon className="plusIco" path={mdiPlus} size={1} onClick={() => setShowTaskForm({})}/>
                </div>
                <div className="taskList">
                        <TaskList></TaskList>
                </div>
                {!!showTaskForm ? (
                    <TaskForm categoryId={category.id} taskBoardId={category.taskBoardId} setShowTaskForm={setShowTaskForm}/>
                ) : null}
                {!!showCategoryForm ? (
                    <CategoryForm 
                        category={category} 
                        setShowCategoryForm={setShowCategoryForm} 
                        taskBoardId ={category.taskBoardId} 
                        setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
                    />
                ) : null}
                {!!showConfirmDeleteDialog && (
                    <CategoryConfirmDeleteForm
                    setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
                    category={category}
                />
            )}
            </div>
        </TaskListProvider>
    )
}

function TaskList() {
    const { taskList } = useContext(TaskListContext);

    return(
        taskList.map(task => (
            <TaskCard task={task}></TaskCard>
        ))
    );
}

export default CategoryCard;