import { TaskBar } from "../Task-Bar/TaskBar";
import { cloneDeep } from "lodash";
import { compareAsc, format } from "date-fns";

import React from "react";
import Card from "../../Card";
import styled from "styled-components";

const Content = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

function TaskBars({
	tasks,
	requestRemoveTask,
	requestEditTask,
	check,
	theme,
	className,
}) {
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
		const deepClonedCurrentTasks = cloneDeep(tasks.tasksListTasks);

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
					theme={theme}
					name={name}
					dateString={dateString}
					onXClick={onXClick}
					onEClick={onEClick}
					isChecked={isChecked}
					onCheck={onCheck}
					key={name + dateString}
					id={name + dateString}
				/>
			);
		});
	};

	return (
		<Card
			className={className}
			color={theme.bluey}
			description="CURRENT TASKS"
		>
			<Content>{makeTaskBars(tasks)}</Content>
		</Card>
	);
}

export { TaskBars };
