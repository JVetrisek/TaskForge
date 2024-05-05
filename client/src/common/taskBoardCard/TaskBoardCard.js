import { useNavigate} from "react-router-dom";
import "./taskboardcard.css";
import TaskBoard from "../taskBoardDetail/TaskBoard";

import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import { mdiPencilBox } from '@mdi/js';

import { useContext, useState } from "react";

import TaskBoardForm from "../taskBoardForm/TaskBoardForm";
import TaskBoardConfirmDeleteForm from "../taskBoardForm/TaskBoardConfirmDeleteForm";

function TaskBoardCard({taskBoard}){
    const [showTaskBoardForm, setShowTaskBoardForm] = useState(false);
    const [ShowTaskBoardConfirmDeleteForm, setShowTaskBoardConfirmDeleteForm] = useState(false);

    const handleOpenDetail = (e) => {
        e.stopPropagation();
        setShowTaskBoardForm(true);
    };

    const navigate = useNavigate()
    return(
        <div>
            <div className="card" onClick={() => navigate(`/TaskBoard?id=${taskBoard.id}`)}>
                <h4 className="heading">{taskBoard.title}</h4>
                <div className="buttonContainer">
                        <Icon className="editButton" path={mdiPencilBox} size={1.2} onClick={handleOpenDetail}/>
                </div>
            </div>
            {!!showTaskBoardForm ? (
                    <TaskBoardForm 
                        setShowTaskBoardForm = {setShowTaskBoardForm}
                        setShowTaskBoardConfirmDeleteForm = {setShowTaskBoardConfirmDeleteForm}
                        taskBoard = {taskBoard}
                    />
            ) : null}

            {!!ShowTaskBoardConfirmDeleteForm && (
                    <TaskBoardConfirmDeleteForm
                    setShowTaskBoardConfirmDeleteForm = {setShowTaskBoardConfirmDeleteForm}
                    taskBoard = {taskBoard}
                    />
            )}
        </div>
    )
}

const handleDeleteButtonClick = (e) => {
    // This function will prevent the click event from bubbling up to the parent card
    e.stopPropagation();
    // Add your delete logic here
    console.log("Delete button clicked");
};



export default TaskBoardCard;