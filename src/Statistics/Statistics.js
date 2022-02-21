import React from "react";
import "./style.css";

function Statistics({ numTasksDone, numAllTasks }) {
	const getDonePercentage = () => {
		return Math.floor((numTasksDone / numAllTasks) * 100);
	};

	return (
		<div className="card-container">
			<div className="card-description description-stats">STATISTICS</div>
			<div className="card-content content-stats">
				<div> num tasks done = {numTasksDone} </div>
				<div> num all tasks = {numAllTasks} </div>
				<div> done percentage = {getDonePercentage()} </div>
			</div>
		</div>
	);
}

export { Statistics };
