import task from "./task";

const tasksList = (tasksArray) => {
	const tasksListTasks = tasksArray;

	const includesTask = (taskName, taskDate) => {
		return tasksListTasks.some((task) => {
			return task.hasSameNameAndDateAs(taskName, taskDate);
		});
	};

	const addTask = (taskName, taskDate, isChecked) => {
		if (!includesTask(taskName, taskDate)) {
			const newTask = task(taskName, taskDate, isChecked);
			return tasksList([...tasksListTasks, newTask]);
		}
		return tasksList(tasksListTasks);
	};

	const removeTask = (taskName, taskDate) => {
		if (includesTask(taskName, taskDate)) {
			return tasksList(
				tasksListTasks.filter((task) => {
					return !task.hasSameNameAndDateAs(taskName, taskDate);
				})
			);
		}
		return tasksList(tasksListTasks);
	};

	const modifyTask = (taskName, taskDate, modifier) => {
		const modifiedTasksList = tasksListTasks.map((task) => {
			if (task.hasSameNameAndDateAs(taskName, taskDate)) {
				return modifier(task);
			}
			return task;
		});
		return tasksList(modifiedTasksList);
	};

	const toggleCheck = (taskName, taskDate) => {
		return modifyTask(taskName, taskDate, (task) => {
			return task.toggleCheck();
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

	return { tasksListTasks, toggleCheck, editTask, addTask, removeTask };
};

export default tasksList;
