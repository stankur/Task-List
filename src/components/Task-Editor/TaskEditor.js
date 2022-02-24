import React, { useState } from "react";
import { parse, format } from "date-fns";

function TaskEditor({ taskName, taskDate, onSubmit, onCancel }) {
	const [name, setName] = useState(taskName);

	const initialDate = format(taskDate, "yyyy-MM-dd");
	const [date, setDate] = useState(initialDate);

	const onNameChange = (event) => {
		setName(event.target.value);
	};

	const onDateChange = (event) => {
		setDate(event.target.value);
	};

	const submit = (event) => {
		event.preventDefault();

		if (date) {
			const parsedDate = parse(date, "yyyy-MM-dd", new Date());
			onSubmit({ name: name, date: parsedDate });
		} else {
			onSubmit({ name: name, date: "" });
		}
	};

	const cancel = (event) => {
		event.preventDefault();

		onCancel();
	};

	return (
		<div>
			<div>EDIT TASK</div>
			<form data-testid="form" onSubmit={submit}>
				<label htmlFor="name"> NAME </label>
				<input
					type="text"
					value={name}
					onChange={onNameChange}
					id="name"
				/>
				<label htmlFor="date"> DATE </label>
				<input
					type="date"
					value={date}
					onChange={onDateChange}
					id="date"
				/>
				<button onClick={cancel}> Cancel </button>
				<input type="submit" data-testid="Submit" />
			</form>
		</div>
	);
}

export { TaskEditor };
