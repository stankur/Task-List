import React, { useState, useEffect } from "react";
import "./App.css";
import "./card-style.css";
import { parse, format } from "date-fns";
import { TaskBars } from "./components/Task-Bars/TaskBars";
import { TaskAdder } from "./components/Task-Adder/TaskAdder";
import { TaskEditor } from "./components/Task-Editor/TaskEditor";
import { Statistics } from "./components/Statistics/Statistics";

import tasksList from "./abstract-objects/tasksList";

function App() {
	let currentTasksFromEarlier;

	if (!localStorage.getItem("currentTasks")) {
		currentTasksFromEarlier = tasksList([]);
	} else {
		const currentTasksFromEarlierRaw = JSON.parse(
			localStorage.getItem("currentTasks")
		);

		let tasksListAccumulator = tasksList([]);

		currentTasksFromEarlierRaw.forEach((task) => {
			tasksListAccumulator = tasksListAccumulator.addTask(
				task.name,
				parse(task.date, "yyyy-MM-dd", new Date()),
				task.isChecked
			);
		});
		currentTasksFromEarlier = tasksListAccumulator;
	}

	const [currentTasks, setCurrentTasks] = useState(currentTasksFromEarlier);
	const [editRequest, setEditRequest] = useState(null);

	useEffect(() => {
		const dateConvertedCurrentTasks = currentTasks.tasksListTasks.map(
			(task) => {
				return {
					name: task.name,
					date: format(task.date, "yyyy-MM-dd"),
					isChecked: task.isChecked,
				};
			}
		);

		const stringifiedCurrentTasks = JSON.stringify(
			dateConvertedCurrentTasks
		);
		localStorage.setItem("currentTasks", stringifiedCurrentTasks);
	});

	const toggleCheck = (nameAndDate) => {
		setCurrentTasks(
			currentTasks.toggleCheck(nameAndDate.name, nameAndDate.date)
		);
	};

	const isThereEditRequest = () => {
		return !(editRequest == null);
	};

	const getERDate = () => {
		return editRequest.date;
	};

	const getERName = () => {
		return editRequest.name;
	};

	const requestExecuteEdit = (nameAndDate) => {
		if (nameAndDate.date.getTime()) {
			setCurrentTasks(
				currentTasks.editTask(
					getERName(),
					getERDate(),
					nameAndDate.name,
					nameAndDate.date
				)
			);
			setEditRequest(null);
		}
	};

	const requestCancelEdit = () => {
		setEditRequest(null);
	};

	const requestAddTask = (nameAndDate) => {
		if (nameAndDate.date) {
			setCurrentTasks(
				currentTasks.addTask(nameAndDate.name, nameAndDate.date, false)
			);
		}
	};

	const requestRemoveTask = (nameAndDate) => {
		setCurrentTasks(
			currentTasks.removeTask(nameAndDate.name, nameAndDate.date)
		);
	};

	const requestEditTask = (nameAndDate) => {
		setEditRequest(nameAndDate);
	};

	const getNumTasksDone = () => {
		return currentTasks.tasksListTasks.filter((task) => {
			return task.isChecked;
		}).length;
	};

	const getNumAllTasks = () => {
		return currentTasks.tasksListTasks.length;
	};

	return (
		<div className="App">
			<div className="content">
				<div className="logo-container">
					<div className="logo">
						<span>TASKLIST</span>
					</div>
				</div>
				<div className="modifier">
					{isThereEditRequest() ? (
						<TaskEditor
							taskName={getERName()}
							taskDate={getERDate()}
							onSubmit={requestExecuteEdit}
							onCancel={requestCancelEdit}
						/>
					) : (
						<TaskAdder onSubmit={requestAddTask} />
					)}
				</div>
				<div className="tasks">
					<TaskBars
						tasks={currentTasks}
						requestRemoveTask={requestRemoveTask}
						requestEditTask={requestEditTask}
						check={toggleCheck}
					/>
				</div>
				<div className="stats">
					<Statistics
						numTasksDone={getNumTasksDone()}
						numAllTasks={getNumAllTasks()}
					/>
				</div>
				<div className="card-container wise-words">
					<div className="card-description description-wise-words">
						WISE WORDS
					</div>
					<div className="card-content content-wise-words"></div>
				</div>
			</div>
		</div>
	);
}

export default App;
