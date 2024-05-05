import { TaskListContext } from "../TaskList/TaskListContext";

import { useContext, useState } from "react";

import Modal from "react-bootstrap/Modal";

import "./taskform.css";

function ConfirmDeleteDialog({ setDeleteForm, task }) {
    const { state, handlerMap } = useContext(TaskListContext);
    const [showAlert, setShowAlert] = useState(null);
    const isPending = state === "pending";
  
    return (
      <Modal className="modal" show={true} onHide={() => setDeleteForm(false)}>
        <form className="form">
          <h2>Delete Task</h2>
          <p>Are you sure you want to delete {task.id}?</p>
            <button
                className="formButton"
                onClick={() => setDeleteForm(false)}
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
                        console.log (task.id);
                        await handlerMap.handleDelete({ id: task.id });
                        setDeleteForm(false);
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
  
  export default ConfirmDeleteDialog;