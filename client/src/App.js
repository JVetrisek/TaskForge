import './App.css';

import Header from './common/header/Header';

import TaskBoardList from './common/taskBoardList/TaskBoardList';
import TaskBoardListProvider from './common/taskBoardList/TaskBoardListProvider';
import TaskBoardProvider from './common/taskBoardDetail/TaskBoardProvider';
import CategoryListProvider from './common/categoryCard/CategoryListProvider';
import TaskListProvider from './common/TaskList/TaskListProvider';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import TaskBoard from './common/taskBoardDetail/TaskBoard';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header/>  
        <div className='content'>
          <Routes>
            <Route path='/' element={
              <TaskBoardListProvider>
                <TaskBoardList></TaskBoardList>
              </TaskBoardListProvider>}
            />
            <Route path="/TaskBoard" element={
              <TaskBoardProvider>
                <CategoryListProvider>

                    <TaskBoard></TaskBoard>

                </CategoryListProvider>
              </TaskBoardProvider>}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
