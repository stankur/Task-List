import React, { useState, useEffect } from "react";

import "./App.css";
import "./card-style.css";
import styled, { ThemeProvider } from "styled-components";
import { rgb } from "polished";
import Card from "./Card";

import { parse, format } from "date-fns";

import { TaskBars } from "./components/Task-Bars/TaskBars";
import { TaskAdder } from "./components/Task-Adder/TaskAdder";
import { TaskEditor } from "./components/Task-Editor/TaskEditor";
import { Statistics } from "./components/Statistics/Statistics";

import tasksList from "./abstract-objects/tasksList";

const theme = {
	backgroundColor: rgb(33, 33, 33),
	semiDark: rgb(41, 41, 41),
	semiLightGray: rgb(64, 63, 63),
	lightGray: rgb(80, 80, 80),
	greeny: rgb(3, 218, 197),
	bluey: rgb(3, 195, 218),
	white: rgb(251, 251, 251),

	roundyFont: "Arial Rounded MT Bold",

	gapSize: "20px",
};

const WiseWords = styled(Card)`
	grid-area: wise-words;
`;

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
		<ThemeProvider theme={theme}>
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
					<WiseWords
						color={theme.greeny}
						description="WISE WORDS"
					></WiseWords>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
