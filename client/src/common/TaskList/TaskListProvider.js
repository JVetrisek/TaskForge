import React, { useEffect, useState } from "react";
import { TaskListContext } from "./TaskListContext";

function TaskListProvider({ children, categoryId }) {
  const [taskListLoadObject, setTaskListLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad(categoryId);
  }, [categoryId]);

  async function handleLoad(categoryId) {
    setTaskListLoadObject((current) => ({ ...current, state: "pending" }));
    fetch(`http://localhost:8080/task/listByCategory?categoryId=${categoryId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
          setTaskListLoadObject({
            state: "error",
            error: responseJson.error,
          });
        } else {
          setTaskListLoadObject({ state: "ready", data: responseJson });
          console.log(taskListLoadObject.data)
        }
      })
      .catch((error) => {
        setTaskListLoadObject({
          state: "error",
          error: error.message,
        });
      });
  }

/*   async function handleLoad(categoryId) {
    setTaskListLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8080/task/listByCategory?categoryId=${categoryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
  });

    const responseJson = await response.json();
    console.log(responseJson)

    if (response.status < 400) {
      setTaskListLoadObject({ state: "ready", data: responseJson });
      console.log(taskListLoadObject.data)
      return responseJson;
    } else {
      setTaskListLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
    }
} */

  async function handleCreate(dtoIn) {
    setTaskListLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8080/task/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();


    if (response.status < 400) {
      setTaskListLoadObject((current) => {
        console.log(current.data)
        const newData = [...current.data, responseJson];
        return { state: "ready", data: newData };
      });
    } else {
      setTaskListLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

/*   async function handleCreate(dtoIn) {
    setTaskListLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch("http://localhost:8080/task/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setTaskListLoadObject((current) => {
        console.log(current)
        const newData = [...current.data, responseJson];
        return { state: "ready", data: newData };
      });
    }
  }
 */

  

  async function handleUpdate(dtoIn) {

    setTaskListLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8080/task/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setTaskListLoadObject((current) => {
        const eventIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[eventIndex] = responseJson;
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setTaskListLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleDelete(dtoIn) {
    console.log(dtoIn);
    setTaskListLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8080/task/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setTaskListLoadObject((current) => {
        const newData = current.data.filter((t) => t.id !== dtoIn.id);
        return { state: "ready", data: newData };
      });
    } else {
      setTaskListLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: taskListLoadObject.state,
    taskList: taskListLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleDelete },
  };

  return (
    <TaskListContext.Provider value={value}>
      {children}
    </TaskListContext.Provider>
  );
}

export default TaskListProvider;
