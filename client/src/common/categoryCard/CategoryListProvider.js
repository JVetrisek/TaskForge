import { useEffect, useState } from "react";

import { CategoryListContext } from "./CategoryListContext.js"

import { useLocation } from "react-router-dom";

function CategoryListProvider({ children }) {
    const [eventLoadObject, setEventLoadObject] = useState({
      state: "ready",
      error: null,
      data: null,
    });
  
    useEffect(() => {
      handleLoad();
    }, []);

    const value = {
      state: eventLoadObject.state,
      categoryList: eventLoadObject.data || [],
      handlerMap: { handleCreate, handleUpdate, handleDelete}
    };

    /* async function handleLoad() {
        setEventLoadObject((current) => ({ ...current, state: "pending" }));
        const response = await fetch(`http://localhost:8080/category/list`, {
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
    } */

    const location = useLocation();

    useEffect(() => {
      handleLoad();
    }, [location]); // Add location.search to dependencies of useEffect

    async function handleLoad(){
      const searchParams = new URLSearchParams(location.search);
      const id = searchParams.get("id");
      console.log(id)
      setEventLoadObject((current) => ({ ...current, state: "loading" }));
      fetch(`http://localhost:8080/category/listByTaskBoard?taskBoardId=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const responseJson = await response.json();
          if (response.status >= 400) {
            setEventLoadObject({ state: "error", error: responseJson.error });
          } else {
            setEventLoadObject({ state: "ready", data: responseJson });
          }
        })
        .catch((error) => {
          setEventLoadObject({
            state: "error",
            error: error.message,
          });
        });

        console.log(`http://localhost:8080/category/listByTaskBoard?categoryId=${id}`)
    } 

    async function handleCreate(dtoIn) {
      const searchParams = new URLSearchParams(location.search);
      dtoIn.taskBoardId = searchParams.get("id");
      console.log(dtoIn)
      setEventLoadObject((current) => ({ ...current, state: "pending" }));
      const response = await fetch(`http://localhost:8080/category/create`, {
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
      console.log(dtoIn)
      setEventLoadObject((current) => ({ ...current, state: "pending" }));
      const response = await fetch(`http://localhost:8080/category/update`, {
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
      const response = await fetch(`http://localhost:8080/category/delete`, {
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

    return (
    <CategoryListContext.Provider value={value}>
        {children}
    </CategoryListContext.Provider>
    );
    }
    
export default CategoryListProvider;
