import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import TaskForm from "../taskForm/TaskForm"
import TaskConfirmDeleteForm from "../taskForm/TaskConfirmDeleteForm"

import "./taskcard.css";

import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import { mdiPencilBox } from '@mdi/js';


function CategoryCard({task}){
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [showDeleteForm, setDeleteForm] = useState(false)

    return(
            <div className="taskCard" >
                <div className="glowStic"></div>
                <div className="borderglow"></div>
                <div className="tasktitle">
                    <div >{task.title}</div>
                    <div className="buttonContainer">
                        <Icon className="deleteButton" path={mdiDelete} size={1} onClick={() => setDeleteForm({})}/>
                        <Icon className="editButton" path={mdiPencilBox} size={1} onClick={() => setShowTaskForm({})}/>
                    </div>
                </div>
                <div className="body">
                    {task.description}
                    <div className="taskDate">{task.completionDate}</div>
                </div>
                {!!showDeleteForm ? (
                    <TaskConfirmDeleteForm setDeleteForm={setDeleteForm} task={task}/>
                ) : null}
                {!!showTaskForm ? (
                    <TaskForm setShowTaskForm={setShowTaskForm} categoryId={task.categoryId} taskBoardId={task.taskBoardId} task={task} />
                ) : null}
            </div>
    )
}
export default CategoryCard;