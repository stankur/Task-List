import { TaskBar } from "./Task-Bar/TaskBar";
import { cloneDeep } from "lodash";
import { compareAsc, format } from "date-fns";
import "./style.css";
import "../card-style.css";

function TaskBars({ tasks, requestRemoveTask, requestEditTask, check }) {
	const dateFormat = "dd MMM yyyy";

	const convertDateToDateString = (date, dateFormat) => {
		return format(date, dateFormat);
	};

	const sortByDate = (tasks) => {
		tasks.sort((task1, task2) => {
			return compareAsc(task1.date, task2.date);
		});
	};

	const getSortedCopyByDateOfTasks = (tasks) => {
		const deepClonedCurrentTasks = cloneDeep(tasks);

		sortByDate(deepClonedCurrentTasks);

		return deepClonedCurrentTasks;
	};

	const makeTaskBars = (tasks) => {
		return getSortedCopyByDateOfTasks(tasks).map((task) => {
			const name = task.name;
			const date = task.date;
			const isChecked = task.isChecked;

			const dateString = convertDateToDateString(date, dateFormat);

			const onXClick = () => {
				requestRemoveTask({ name, date });
			};
			const onEClick = () => {
				requestEditTask({ name, date });
			};
			const onCheck = () => {
				check({ name, date });
			};

			return (
				<TaskBar
					name={name}
					dateString={dateString}
					onXClick={onXClick}
					onEClick={onEClick}
					isChecked={isChecked}
					onCheck={onCheck}
					key={name + dateString}
				/>
			);
		});
	};

	return (
		<div className="card-container task-bars-container">
			<div className="card-description description-task-bars">
				CURRENT TASKS
			</div>
			<div className="card-content content-task-bars">
				{makeTaskBars(tasks)}
			</div>
		</div>
	);
}

export { TaskBars };
