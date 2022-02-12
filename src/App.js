import React, { useState, useEffect } from 'react';
import './App.css';
import './card-style.css'
import { parse,compareAsc, format, isEqual } from 'date-fns'
import { TaskBar } from './Task-bar/TaskBar'
import { TaskAdder } from './Task-Adder/TaskAdder'
import { TaskEditor } from './Task-Editor/TaskEditor'
import { find, cloneDeep } from 'lodash';


function App() {

  let currentTasksFromEarlier;

  if(!localStorage.getItem("currentTasks")) {
    currentTasksFromEarlier = [];
  } else {
    const currentTasksFromEarlierRaw = JSON.parse(localStorage.getItem("currentTasks"));
    const parsedDateConverted = currentTasksFromEarlierRaw.map((task) => {
      return { name:task.name, date:parse(task.date, 'yyyy-MM-dd', new Date())}
    })
    currentTasksFromEarlier = parsedDateConverted
  }
  
  const [ currentTasks, setCurrentTasks ] = useState(currentTasksFromEarlier);
  const [ editRequest, setEditRequest ] = useState(null);

  useEffect(() => {
    const dateConvertedCurrentTasks = currentTasks.map((task) => {
      return { name:task.name, date:format(task.date, 'yyyy-MM-dd') }
    })

    const stringifiedCurrentTasks = JSON.stringify(dateConvertedCurrentTasks);
    localStorage.setItem('currentTasks', stringifiedCurrentTasks);
  })

  const dateFormat = 'dd MMM yyyy';

  const isThereEditRequest = () => {
    return !(editRequest == null)
  }

  const convertDateToDateString = (date, dateFormat) => {
    return format(date, dateFormat);
  }

  const getERDateString = () => {
      return convertDateToDateString(editRequest.date, 'yyyy-MM-dd');
  }

  const getERName = () => {
    return editRequest.name
  }

  const requestExecuteEdit = (nameAndDate) => {
    if (nameAndDate.date.getTime()) {
      if (isTaskNew(nameAndDate)) {
        const newCurrentTasks = currentTasks.map((task) => {
          if ((task.name === editRequest.name) && isEqual(task.date, editRequest.date)) {
            const name = nameAndDate.name;
            const date = nameAndDate.date;

            return { name, date }
          }
          return task
        })

        setCurrentTasks(newCurrentTasks);
      } 

    setEditRequest(null);
    }
  }

  const requestCancelEdit = () => {
    setEditRequest(null);
  }

  const requestAddTask = (nameAndDate) => {
    if (nameAndDate.date){
      if (isTaskNew(nameAndDate)) {
        const newCurrentTasks = [ ...currentTasks, nameAndDate ];
        setCurrentTasks(newCurrentTasks);

      } else {
        alert('task already exists');
      }
    }
  }

  const isTaskNew = (nameAndDate) => {
    const matchingElement = find(currentTasks, (task) => {
      return (task.name === nameAndDate.name) && isEqual(task.date, nameAndDate.date)
    });

    if (matchingElement) {
      return false
    }

    return true
  }

  const requestRemoveTask = (nameAndDate) => {
    const newCurrentTasks = currentTasks.filter((task) => {
      return !((task.name === nameAndDate.name) && isEqual(task.date, nameAndDate.date));
    })

    setCurrentTasks(newCurrentTasks);
  }

  const requestEditTask = (nameAndDate) => {
    setEditRequest(nameAndDate);
  }

  const sortByDate = (tasks) => {
    tasks.sort((task1, task2) => {
      return compareAsc(task1.date, task2.date);
    })
  } 

  const sortedCopyByDateOfCurrentTasks = () => {
    const deepClonedCurrentTasks = cloneDeep(currentTasks);
    
    sortByDate(deepClonedCurrentTasks);

    return deepClonedCurrentTasks
  }

  const makeTaskBars = () => {

    return sortedCopyByDateOfCurrentTasks().map((task) => {
      const name = task.name;
      const date = task.date;

      const dateString = convertDateToDateString(date, dateFormat);

      const onXClick = () => { requestRemoveTask({ name, date })};
      const onEClick = () => { requestEditTask({ name, date })};

      return <TaskBar name={name} dateString={dateString} onXClick={onXClick} onEClick={onEClick} key={name+dateString}/>
    });
  }
 
  return (
  <div className="App">
    <div className="content">
      <div className="logo-container">
        <div className="logo">
          <span>TASKLIST</span>
        </div>
      </div>
      <div className="modifier">
        {isThereEditRequest()
        ? <TaskEditor name={getERName()} dateString={getERDateString()} onSubmit={requestExecuteEdit} onCancel={requestCancelEdit} />
        : <TaskAdder onSubmit={requestAddTask}/>
        }
      </div>
      <div className="card-container tasks">
        <div className="card-description description-current-tasks">CURRENT TASKS</div>
        <div className="card-content content-current-tasks">
          {makeTaskBars()}
        </div>
      </div>
      <div className="card-container stats">
        <div className="card-description description-stats">STATISTICS</div>
        <div className="card-content content-stats"></div>
      </div>
      <div className="card-container wise-words">
        <div className="card-description description-wise-words">WISE WORDS</div>
        <div className="card-content content-wise-words"></div>
      </div>
    </div>
  </div>
  );
}


export default App;
