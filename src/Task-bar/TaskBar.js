import React from "react"
import './style.css'

function TaskBar(props) {
    return (
        <div className="task-bar">
            <input type="checkbox" />
            <span className="task-name">{props.name}</span>
            <span>{props.dateString}</span>
            <button id="x" onClick={props.onXClick}>X</button>
            <button id="E" onClick={props.onEClick}>E</button>
        </div>
    )}

export { TaskBar }