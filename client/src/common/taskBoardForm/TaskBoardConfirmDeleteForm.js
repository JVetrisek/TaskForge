import { TaskBoardListContext } from "../taskBoardList/TaskBorderListContext";

import { useContext, useState } from "react";

import Modal from "react-bootstrap/Modal";

import "../taskForm/taskform.css";

function TaskBoardConfirmDeleteForm({ setShowTaskBoardConfirmDeleteForm, taskBoard }) {
    const { state, handlerMap } = useContext(TaskBoardListContext);
    const [showAlert, setShowAlert] = useState(null);
    const isPending = state === "pending";
  
    const confirmDeleteClose = () => {
        setShowTaskBoardConfirmDeleteForm(false);
    };

    return (
      <Modal className="modal" show={true} onHide={() => confirmDeleteClose()}>
        <form className="form">
          <h2>Delete task board</h2>
          <p>
            Are you sure you want to delete {taskBoard.title}?
          </p>
            <button
                className="formButton"
                onClick={() => confirmDeleteClose()}
                disabled={isPending}
            >
                Close
            </button>
            <button
                className="deleteButton"
                type="submit"
                disabled={isPending}
                onClick={async (e) => {
                    try {
                        await handlerMap.handleDelete({ id: taskBoard.id });
                        confirmDeleteClose();
                    } catch (e) {
                        console.error(e);
                        setShowAlert(e.message);
                    }
                }}
            >
                Delete Task
            </button>;
        </form>
      </Modal>
    );
  }
  
  export default TaskBoardConfirmDeleteForm;