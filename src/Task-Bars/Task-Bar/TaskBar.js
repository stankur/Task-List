import React from 'react'
import './style.css'

function TaskBar(props) {
    const onCheckBoxClick = () => {
        const onCheck = props.onCheck;
        onCheck();
    }

    let checkBoxContentClasses = "checkbox-content";

    if (props.isChecked) {
        checkBoxContentClasses = checkBoxContentClasses + " checked-checkbox";
    }


    return (
        <div className="task-bar">
            <label htmlFor="check" className="checkbox" onClick={onCheckBoxClick}>
                <span className={checkBoxContentClasses}>✓</span>
            </label>
            <input type="checkbox" name="check" className="check"/>
            <span className="task-name">{props.name}</span>
            <span>{props.dateString}</span>
            <button id="x" onClick={props.onXClick}>X</button>
            <button id="E" onClick={props.onEClick}>E</button>
        </div>
    )}

export { TaskBar }