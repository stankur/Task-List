import { TaskBar } from '../Task-Bar/TaskBar';
import { cloneDeep } from 'lodash'
import { compareAsc, format } from 'date-fns'
import './style.css'
import '../card-style.css'


function TaskBars(props) {
    const dateFormat = 'dd MMM yyyy';

    const convertDateToDateString = (date, dateFormat) => {
        return format(date, dateFormat);
      }
    
    const sortByDate = (tasks) => {
        tasks.sort((task1, task2) => {
          return compareAsc(task1.date, task2.date);
        })
      }     

    const getSortedCopyByDateOfTasks = (tasks) => {
        const deepClonedCurrentTasks = cloneDeep(tasks);
    
        sortByDate(deepClonedCurrentTasks);
    
        return deepClonedCurrentTasks    
    }

    const makeTaskBars = (tasks) => {
        return getSortedCopyByDateOfTasks(tasks).map((task) => {
            const name = task.name;
            const date = task.date;
    
            const dateString = convertDateToDateString(date, dateFormat);
    
            const onXClick = () => { props.requestRemoveTask({ name, date })};
            const onEClick = () => { props.requestEditTask({ name, date })};
    
            return <TaskBar name={name} dateString={dateString} onXClick={onXClick} onEClick={onEClick} key={name+dateString}/>
        });
    }
    
    return (
        <div className="card-container tasks">
            <div className="card-description description-current-tasks">
                CURRENT TASKS
            </div>
            <div className="card-content content-current-tasks">
                {makeTaskBars(props.tasks)}
            </div>
        </div>
    );
}

export { TaskBars }