import { useContext, useState } from "react";
import { TaskBoardListContext } from "../taskBoardList/TaskBorderListContext";

import "../taskForm/taskform.css"

import Modal from "react-bootstrap/Modal";

import testUserData from "../testUser/testUser"

function TaskBoardForm({setShowTaskBoardForm, taskBoard = {}, setShowTaskBoardConfirmDeleteForm}){
    const { state, handlerMap } = useContext(TaskBoardListContext);
    const [showAlert, setShowAlert] = useState(null);
    const isPending = state === "pending";

    const confirmDelete = () => {
        setShowTaskBoardForm(true);
    };

    const userData = testUserData();

    return(
        <Modal className="modal" show={true} onHide={() => setShowTaskBoardForm(false)}>
            <form
                className="form"
                onSubmit={async (t) => {
                t.preventDefault();
                t.stopPropagation();
                var formData = Object.fromEntries(new FormData(t.target));

                try {
                    setShowTaskBoardForm(false);
                    if (taskBoard.id) {
                    formData.id = taskBoard.id;
                    await handlerMap.handleUpdate(formData);
                    } else {
                        console.log(userData);
                        formData.ownerId = userData.id;
                    await handlerMap.handleCreate(formData);
                    }
                } catch (e) {
                    console.error(e);
                    setShowAlert(e.message);
                }
            }}
            >
                <h2>
                    {`${
                        taskBoard.id ? "Update" : "Create"
                    } task board`}
                </h2>
                <div>
                    <label>Title</label>
                    <input
                    type="input"
                    name="title"
                    required
                    defaultValue={
                        taskBoard.title
                    }
                    />
                </div>
                <button
                    className="formButton"
                    onClick={() => setShowTaskBoardForm(false)}
                    disabled={isPending}
                >
                    Close
                </button>
                {
                    taskBoard.id && (
                    <button
                        className="deleteButton"
                        onClick={() => {
                            confirmDelete();
                            setShowTaskBoardConfirmDeleteForm(true);
                        }}
                        disabled={isPending}
                    >
                        Delete task board
                    </button>
                )}
                <button className="formButton" type="submit" variant="primary" disabled={isPending}>
                    {taskBoard.id ? "Update" : "Create"}
                </button>
            </form>
        </Modal>
    )
}

export default TaskBoardForm;