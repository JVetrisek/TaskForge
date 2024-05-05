import { useContext, useState } from "react";
import { TaskListContext } from "../TaskList/TaskListContext";

import "./taskform.css";

import Modal from "react-bootstrap/Modal";

function TaskForm({ setShowTaskForm, categoryId, taskBoardId, task = {}}){
    const { state, handlerMap } = useContext(TaskListContext);
    const [showAlert, setShowAlert] = useState(null);
    const isPending = state === "pending";

    const handleClose = () => {
        setShowTaskForm(false);
    };

    return(
        <div>
        <Modal className="modal" show={true} onHide={() => handleClose()}>
            <form className="form"
                onSubmit={async (t) => {
                t.preventDefault();
                t.stopPropagation();

                
                var formData = Object.fromEntries(new FormData(t.target));
                if(!formData.completionDate){
                    delete formData.completionDate;
                } else {
                    console.log(formData.completionDate)
                    /* formData.date = new Date(formData.date).toISOString(); */
                }
                

                formData.categoryId = categoryId;
                formData.taskBoardId = taskBoardId;

                try {
                    handleClose();
                    if (task.id) {
                    formData.id = task.id;
                    await handlerMap.handleUpdate(formData);
                    } else {
                    await handlerMap.handleCreate(formData);
                    }
                } catch (e) {
                    console.error(e);
                    setShowAlert(e.message);
                }
            }}
            >
                <h2>{`${
                        task.title ? "Update" : "Create"
                    } task`}
                </h2>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        defaultValue={
                            task.title
                        }
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        type="text"
                        name="description"
                        required
                        defaultValue={
                            task.description
                        }
                    />
                </div>
                <div>
                    <label>Completion date</label>
                    <input
                        type="date"
                        name="completionDate"
                        defaultValue={
                            task.date ? taskDateToInput(task.date) : undefined
                        }
                    />
                </div>
                <button
                    className="formButton"
                    onClick={() => handleClose()}
                    disabled={isPending}
                >
                    Close
                </button>
                <button className="formButton" type="submit" disabled={isPending}>
                    {task.id ? "Update" : "Create"}
                </button>
            </form>
        </Modal>
        </div>
    )
}
  
function taskDateToInput(date) {
    date = new Date(date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}




export default TaskForm;