import { createContext } from "react";

export const TaskListContext = createContext({
    taskList: [],
    categoryId: 0,
    setCategory: () => {},
});