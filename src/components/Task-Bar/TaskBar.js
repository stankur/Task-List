import React from "react";
import "./style.css";

function TaskBar({ name, dateString, onXClick, onEClick, isChecked, onCheck }) {
	const onCheckBoxClick = () => {
		onCheck();
	};

	let checkBoxContentClasses = "checkbox-content";

	if (isChecked) {
		checkBoxContentClasses = checkBoxContentClasses + " checked-checkbox";
	}

	return (
		<div className="task-bar">
			<label
				htmlFor="check"
				className="checkbox"
				onClick={onCheckBoxClick}
			>
				<span className={checkBoxContentClasses}>✓</span>
			</label>
			<input type="checkbox" name="check" className="check" />
			<span className="task-name">{name}</span>
			<span>{dateString}</span>
			<button id="x" onClick={onXClick}>
				X
			</button>
			<button id="E" onClick={onEClick}>
				E
			</button>
		</div>
	);
}

export { TaskBar };
