import { isEqual } from "date-fns";
import task from "./task";

const tasksList = (tasksListTasks) => {
	const tasksList = tasksListTasks;

	const includesTask = (taskName, taskDate) => {
		tasksList.some((task) => {
			return task.name === taskName && isEqual(task.date, taskDate);
		});
	};

	const modifyTask = (taskName, taskDate, modifier) => {
		const modifiedTasksList = tasksList.map((task) => {
			if (task.isSameAs(taskName, taskDate)) {
				return modifier(task);
			}
			return task;
		});
		return tasksList(modifiedTasksList);
	};

	const togglecheck = (taskName, taskDate) => {
		return modifyTask(taskName, taskDate, (task) => {
			return task.togglecheck();
		});
	};

	const editTask = (oldTaskName, oldTaskDate, newTaskName, newTaskDate) => {
		return modifyTask(oldTaskName, oldTaskDate, (task) => {
			if (!includesTask(newTaskName, newTaskDate)) {
				return task.changeName(newTaskName).changeDate(newTaskDate);
			}
			return task;
		});
	};

	const addTask = (taskName, taskDate) => {
		if (!includesTask(taskName, taskDate)) {
			const newTask = task(taskName, taskDate, false);
			return tasksList([...tasksList, newTask]);
		}
		return tasksList(tasksList);
	};

	const removeTask = (taskName, taskDate) => {
		if (includesTask(taskName, taskDate)) {
			return tasksList(
				tasksList.filter((task) => {
					return !task.isSameAs(taskName, taskDate);
				})
			);
		}
	};

	return { tasksList, togglecheck, editTask, addTask, removeTask };
};
