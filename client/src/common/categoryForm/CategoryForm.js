import { useContext, useState } from "react";
import { CategoryListContext } from "../categoryCard/CategoryListContext";

import "../taskForm/taskform.css"

import Modal from "react-bootstrap/Modal";

function CategoryForm({setShowConfirmDeleteDialog, setShowCategoryForm, category = {}, taskBoardId = ""}){
    const { state, handlerMap } = useContext(CategoryListContext);
    const [showAlert, setShowAlert] = useState(null);
    const isPending = state === "pending";

    const confirmDelete = () => {
        setShowConfirmDeleteDialog(true);
    };

    return(
        <Modal className="modal" show={true} onHide={() => setShowCategoryForm(false)}>
            <form
                className="form"
                onSubmit={async (t) => {
                t.preventDefault();
                t.stopPropagation();
                var formData = Object.fromEntries(new FormData(t.target));

                try {
                    setShowCategoryForm(false);
                    if (category.id) {
                    formData.id = category.id;
                    formData.taskBoardId = category.taskBoardId;
                    await handlerMap.handleUpdate(formData);
                    } else {
                    formData.taskBoardId = taskBoardId;
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
                        category.id ? "Update" : "Create"
                    } task`}
                </h2>
                <div>
                    <label>Title</label>
                    <input
                    type="input"
                    name="title"
                    required
                    defaultValue={
                        category.title
                    }
                    />
                </div>
                <button
                    className="formButton"
                    onClick={() => setShowCategoryForm(false)}
                    disabled={isPending}
                >
                    Close
                </button>
                {
                    category.id && (
                    <button
                    className="deleteButton"
                    onClick={() => {
                        confirmDelete();
                        setShowCategoryForm(false);
                    }}
                    disabled={isPending}
                    >
                        Delete category
                    </button>
                )}
                
                <button className="formButton" type="submit" variant="primary" disabled={isPending}>
                    {category.id ? "Update" : "Create"}
                </button>
            </form>
        </Modal>
    )
}

export default CategoryForm;