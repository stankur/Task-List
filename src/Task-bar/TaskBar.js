import React from "react"

function TaskBar(props) {
    return (
        <div>
            <input type="checkbox" />
            <span>{props.name}</span>
            <span>{props.dateString}</span>
            <button onClick={props.onXClick}>x</button>
            <button onClick={props.onEClick}>E</button>
        </div>
    )}

export { TaskBar }