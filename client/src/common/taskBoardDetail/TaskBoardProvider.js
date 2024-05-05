import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import { TaskBoardContext } from "./TaskBoardContext.js"

function TaskBoardProvider({ children }) {
    const [taskBoardLoadObject, setTaskBoardLoadObject] = useState({
      state: "ready",
      error: null,
      data: null,
    });

    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
      handleLoad();
    }, []);

    async function handleLoad() {
      setTaskBoardLoadObject((current) => ({ ...current, state: "pending" }));
      const response = await fetch(`http://localhost:8080/taskBoard/get?id=${new URLSearchParams(location.search).get("id")}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
      });
      const responseJson = await response.json();

      if (response.status < 400) {
        setTaskBoardLoadObject({ state: "ready", data: responseJson });
        return responseJson;
      } else {
        setTaskBoardLoadObject((current) => ({
          state: "error",
          data: current.data,
          error: responseJson.error,
        }));
        throw new Error(JSON.stringify(responseJson, null, 2));
      }
    }

    const value = {
      taskBoard: taskBoardLoadObject.data || {},
    };

    //console.log(taskBoardLoadObject.data)
    return (
    <TaskBoardContext.Provider value={value}>
        {children}
    </TaskBoardContext.Provider>
    );
    }
    
export default TaskBoardProvider;