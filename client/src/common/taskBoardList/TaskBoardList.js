import './taskboardlist.css';
import { TaskBoardListContext } from "./TaskBorderListContext.js"
import { useContext, useState } from "react";

import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

import TaskBoardForm from '../taskBoardForm/TaskBoardForm.js';

import TaskBoardCard from '../taskBoardCard/TaskBoardCard.js';


  function TaskBoardList() {
    const {taskBoardList} = useContext(TaskBoardListContext);
    const [showTaskBoardForm, setShowTaskBoardForm] = useState(false);

    return (
        <div>
            <div className='listHeader'>
                <div>
                    <h1 className='listTitle'>Task board list</h1>
                </div>
                <div className='filterButtonList'>
                    <button className='filterButton'>Dsiplay time</button>
                    <button className='filterButton'>Your Task Boards</button>
                    <button className='filterButton'>Favourites</button>
                </div>
            </div>
            <div className='taskBoardList'>
                {
                    taskBoardList.map((taskBoard)=>{
                        return(
                            <TaskBoardCard key={taskBoard.id} taskBoard={taskBoard}/>
                        )
                    })
                }
                <div className='addTaskBoardButton'>
                    <Icon path={mdiPlus} size={1.2}  onClick={setShowTaskBoardForm}/>
                </div>
            </div>
            {!!showTaskBoardForm ? (
                    <TaskBoardForm 
                        setShowTaskBoardForm = {setShowTaskBoardForm}
                    />
            ) : null}¨
        </div>
      
    );
  }

export default TaskBoardList;