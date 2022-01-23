import React, { useState } from 'react';
import './App.css';
import { format, isEqual } from 'date-fns'
import { TaskBar } from './Task-bar/TaskBar'
import { TaskAdder } from './Task-Adder/TaskAdder'
import { TaskEditor } from './Task-Editor/TaskEditor'
import { find } from 'lodash';


function App() {

  const [ currentTasks, setCurrentTasks ] = useState([]);
  const [ editRequest, setEditRequest ] = useState(null);


  const dateFormat = 'dd MMM yyyy';

  const isThereEditRequest = () => {
    return !(editRequest == null)
  }

  const convertDateToDateString = (date, dateFormat) => {
    return format(date, dateFormat);
  }

  const getERDateString = () => {
    return convertDateToDateString(editRequest.date, dateFormat);
  }

  const getERName = () => {
    return editRequest.name
  }

  const requestExecuteEdit = (nameAndDate) => {
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

  const requestCancelEdit = () => {
    setEditRequest(null);
  }

  const requestAddTask = (nameAndDate) => {
    if (isTaskNew(nameAndDate)) {
      const newCurrentTasks = [ ...currentTasks, nameAndDate ];
      setCurrentTasks(newCurrentTasks);

    } else {
      alert('task already exists');
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

  const makeTaskBars = () => {
    return currentTasks.map((task) => {
      const name = task.name;
      const date = task.date;

      const dateString = convertDateToDateString(date, dateFormat);

      const onXClick = () => { requestRemoveTask({ name, date })};
      const onEClick = () => { requestEditTask({ name, date })};

      return <TaskBar name={name} dateString={dateString} onXClick={onXClick} onEClick={onEClick} key={name+dateString}/>
    });
  }
 
  return (
  <div>
    <div>
      Tasks
    </div>
    {makeTaskBars()}
    {isThereEditRequest()
    ? <TaskEditor name={getERName()} dateString={getERDateString()} onSubmit={requestExecuteEdit} onCancel={requestCancelEdit} />
    : <TaskAdder onSubmit={requestAddTask}/>
    }
  </div>
  );
}


export default App;
