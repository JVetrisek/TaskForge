
import { useEffect, useState, location } from "react";

import { TaskBoardListContext } from "./TaskBorderListContext.js"

function TaskBoardListProvider({ children }) {
    const [eventLoadObject, setEventLoadObject] = useState({
      state: "ready",
      error: null,
      data: null,
    });
  
    useEffect(() => {
      handleLoad();
    }, []);


    async function handleLoad() {
        setEventLoadObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:8080/taskBoard/list`, {
          method: "GET",
        });
        const responseJson = await response.json();
        if (response.status < 400) {
          setEventLoadObject({ state: "ready", data: responseJson });
          return responseJson;
        } else {
          setEventLoadObject((current) => ({
            state: "error",
            data: current.data,
            error: responseJson.error,
          }));
          throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }

    async function handleCreate(dtoIn) {
      setEventLoadObject((current) => ({ ...current, state: "pending" }));
      const response = await fetch(`http://localhost:8080/taskBoard/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dtoIn),
      });
      const responseJson = await response.json();
  
      if (response.status < 400) {
        setEventLoadObject((current) => {
          const newData = [...current.data, responseJson];
          return { state: "ready", data: newData };
        });
      } else {
        setEventLoadObject((current) => ({
          state: "error",
          data: current.data,
          error: responseJson,
        }));
        throw new Error(JSON.stringify(responseJson, null, 2));
      }
    }
  
    async function handleUpdate(dtoIn) {
      setEventLoadObject((current) => ({ ...current, state: "pending" }));
      const response = await fetch(`http://localhost:8080/taskBoard/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dtoIn),
      });
      const responseJson = await response.json();
  
      if (response.status < 400) {
        setEventLoadObject((current) => {
          const eventIndex = current.data.findIndex(
            (e) => e.id === responseJson.id
          );
          current.data[eventIndex] = responseJson;
          current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
          return { state: "ready", data: current.data };
        });
        return responseJson;
      } else {
        setEventLoadObject((current) => ({
          state: "error",
          data: current.data,
          error: responseJson,
        }));
        throw new Error(JSON.stringify(responseJson, null, 2));
      }
    }
  
    async function handleDelete(dtoIn) {
      setEventLoadObject((current) => ({ ...current, state: "pending" }));
      const response = await fetch(`http://localhost:8080/taskBoard/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dtoIn),
      });
      const responseJson = await response.json();
  
      if (response.status < 400) {
        setEventLoadObject((current) => {
          const newData = current.data.filter((t) => t.id !== dtoIn.id);
          return { state: "ready", data: newData };
        });
      } else {
        setEventLoadObject((current) => ({
          state: "error",
          data: current.data,
          error: responseJson,
        }));
        throw new Error(JSON.stringify(responseJson, null, 2));
      }
    }
  
    const value = {
      state: eventLoadObject.state,
      taskBoardList: eventLoadObject.data || [],
      handlerMap: { handleCreate, handleUpdate, handleDelete },
    };

    return (
    <TaskBoardListContext.Provider value={value}>
        {children}
    </TaskBoardListContext.Provider>
    );
    }
    
export default TaskBoardListProvider;