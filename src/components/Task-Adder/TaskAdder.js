import React, { useState } from "react";
import { parse } from "date-fns";

import NameAndDateForm from "../NameAndDateForm/NameAndDateForm";

import Card from "../../Card";

function TaskAdder({ onSubmit, theme, className }) {
	const [name, setName] = useState("");
	const [date, setDate] = useState("");

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

		setName("");
		setDate("");
	};

	return (
		<Card
			className={className}
			color={theme.greeny}
			theme={theme}
			description="ADD TASK"
		>
			<NameAndDateForm
				data-testid="form"
				theme={theme}
				name={name}
				onNameChange={onNameChange}
				date={date}
				submit={submit}
				onDateChange={onDateChange}
			></NameAndDateForm>
		</Card>
	);
}

export { TaskAdder };
