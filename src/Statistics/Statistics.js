import React from 'react'
import './style.css'

function Statistics(props) {

    const getDonePercentage = () => {
        return Math.floor((props.numTasksDone / props.numAllTasks) * 100);
    }

    return (
        <div className="card-container">
        <div className="card-description description-stats">STATISTICS</div>
        <div className="card-content content-stats">
            <div> num tasks done = {props.numTasksDone} </div>
            <div> num all tasks = {props.numAllTasks} </div>
            <div> done percentage = {getDonePercentage()} </div>
        </div>
      </div>
    );
}

export { Statistics }