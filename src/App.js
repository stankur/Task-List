import React, { useState } from 'react';
import './App.css';
import { format } from 'date-fns'
import { TaskBar } from './Task-bar/TaskBar'
import { TaskAdder } from './Task-Adder/TaskAdder'

function App() {
  const [ currentTasks, setCurrentTasks] = useState({});

  const findTask = ({ name, date }) => {

  }

  return (
  <div>
    <div>
      Tasks
    </div>
    <TaskBar />
    <TaskForm />
  </div>
  );
}

function TaskForm() {
  return (
    
  );
}

export default App;
