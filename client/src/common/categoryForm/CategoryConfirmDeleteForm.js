import { CategoryListContext } from "../categoryCard/CategoryListContext";

import { useContext, useState } from "react";

import Modal from "react-bootstrap/Modal";

import "../taskForm/taskform.css";

function CategoryConfirmDeleteForm({ setShowConfirmDeleteDialog, category }) {
    const { state, handlerMap } = useContext(CategoryListContext);
    const [showAlert, setShowAlert] = useState(null);
    const isPending = state === "pending";
  
    const confirmDeleteClose = () => {
        setShowConfirmDeleteDialog(false);
    };

    return (
      <Modal className="modal" show={true} onHide={() => confirmDeleteClose()}>
        <form className="form">
          <h2>Delete category</h2>
          <p>
            Are you sure you want to delete {category.title}?
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
                        console.log (category.id);
                        await handlerMap.handleDelete({ id: category.id });
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
  
  export default CategoryConfirmDeleteForm;