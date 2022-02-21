import React, { useState, useEffect } from "react";
import "./App.css";
import "./card-style.css";
import { parse, format, isEqual } from "date-fns";
import { TaskBars } from "./Task-Bars/TaskBars";
import { TaskAdder } from "./Task-Adder/TaskAdder";
import { TaskEditor } from "./Task-Editor/TaskEditor";
import { Statistics } from "./Statistics/Statistics";
import { find } from "lodash";

function App() {
	let currentTasksFromEarlier;

	if (!localStorage.getItem("currentTasks")) {
		currentTasksFromEarlier = [];
	} else {
		const currentTasksFromEarlierRaw = JSON.parse(
			localStorage.getItem("currentTasks")
		);
		const parsedDateConverted = currentTasksFromEarlierRaw.map((task) => {
			return {
				name: task.name,
				date: parse(task.date, "yyyy-MM-dd", new Date()),
				isChecked: task.isChecked,
			};
		});
		currentTasksFromEarlier = parsedDateConverted;
	}

	const [currentTasks, setCurrentTasks] = useState(currentTasksFromEarlier);
	const [editRequest, setEditRequest] = useState(null);

	useEffect(() => {
		const dateConvertedCurrentTasks = currentTasks.map((task) => {
			return {
				name: task.name,
				date: format(task.date, "yyyy-MM-dd"),
				isChecked: task.isChecked,
			};
		});

		const stringifiedCurrentTasks = JSON.stringify(
			dateConvertedCurrentTasks
		);
		localStorage.setItem("currentTasks", stringifiedCurrentTasks);
	});

	const modifyTasksAtTask = (nameAndDate, modifier) => {
		const modifiedCurrentTasks = currentTasks.map((task) => {
			if (
				task.name === nameAndDate.name &&
				isEqual(task.date, nameAndDate.date)
			) {
				return modifier(task);
			}
			return task;
		});
		return modifiedCurrentTasks;
	};

	const check = (nameAndDate) => {
		setCurrentTasks(
			modifyTasksAtTask(nameAndDate, (task) => {
				const newCheckedState = !task.isChecked;
				return {
					name: task.name,
					date: task.date,
					isChecked: newCheckedState,
				};
			})
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
			if (isTaskNew(nameAndDate)) {
				setCurrentTasks(
					modifyTasksAtTask(editRequest, (task) => {
						return {
							name: nameAndDate.name,
							date: nameAndDate.date,
							isChecked: task.isChecked,
						};
					})
				);
			}

			setEditRequest(null);
		}
	};

	const requestCancelEdit = () => {
		setEditRequest(null);
	};

	const requestAddTask = (nameAndDate) => {
		if (nameAndDate.date) {
			if (isTaskNew(nameAndDate)) {
				const newTask = { ...nameAndDate, isChecked: false };
				const newCurrentTasks = [...currentTasks, newTask];
				setCurrentTasks(newCurrentTasks);
			} else {
				alert("task already exists");
			}
		}
	};

	const isTaskNew = (nameAndDate) => {
		const matchingElement = find(currentTasks, (task) => {
			return (
				task.name === nameAndDate.name &&
				isEqual(task.date, nameAndDate.date)
			);
		});

		if (matchingElement) {
			return false;
		}

		return true;
	};

	const requestRemoveTask = (nameAndDate) => {
		const newCurrentTasks = currentTasks.filter((task) => {
			return !(
				task.name === nameAndDate.name &&
				isEqual(task.date, nameAndDate.date)
			);
		});

		setCurrentTasks(newCurrentTasks);
	};

	const requestEditTask = (nameAndDate) => {
		setEditRequest(nameAndDate);
	};

	const getNumTasksDone = () => {
		return currentTasks.filter((task) => {
			return task.isChecked;
		}).length;
	};

	const getNumAllTasks = () => {
		return currentTasks.length;
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
						check={check}
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
