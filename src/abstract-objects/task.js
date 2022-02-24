import { isEqual } from "date-fns";

const task = (taskName, taskDate, taskIsChecked) => {
	const name = taskName;
	const date = taskDate;
	const isChecked = taskIsChecked;

	const changeName = (newName) => {
		return task(newName, date, isChecked);
	};

	const changeDate = (newDate) => {
		return task(name, newDate, isChecked);
	};

	const toggleCheck = () => {
		return task(name, date, !isChecked);
	};

	const hasSameNameAndDateAs = (taskName, taskDate) => {
		return name === taskName && isEqual(date, taskDate);
	};

	return {
		name,
		date,
		isChecked,
		changeName,
		changeDate,
		toggleCheck,
		hasSameNameAndDateAs,
	};
};

export default task;
