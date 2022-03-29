import React, { useState } from "react";
import { parse, format } from "date-fns";
import NameAndDateForm from "../NameAndDateForm/NameAndDateForm";

import { lighten } from "polished";
import styled from "styled-components";

import Card from "../../Card";

const ownPadding = "6px";
const width = `max(calc(6ch + (2 * ${ownPadding})), 20%)`;

const CancelButton = styled.button`
	position: absolute;
	left: 0;
	bottom: 0;

	font-family: ${(props) => props.theme.roundyFont}, sans-serif;
	font-size: 13px;

	box-sizing: border-box;
	display: block;

	border-style: solid;
	border-radius: 5px;
	border-width: 1px;
	border-color: ${(props) => props.theme.greeny};

	width: ${width};
	padding: ${ownPadding};

	background-color: ${(props) => props.theme.semiDark};
	color: ${(props) => props.theme.greeny};

	transition: background-color 200ms ease-in-out;

	&:hover {
		background-color: ${(props) => lighten(0.05, props.theme.semiDark)};
	}
`;

function TaskEditor({
	taskName,
	taskDate,
	onSubmit,
	onCancel,
	theme,
	className,
}) {
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
		<Card
			theme={theme}
			color={theme.greeny}
			className={className}
			description="EDIT TASK"
		>
			<NameAndDateForm
				data-testid="form"
				theme={theme}
				name={name}
				onNameChange={onNameChange}
				date={date}
				submit={submit}
				onDateChange={onDateChange}
			>
				<CancelButton theme={theme} onClick={cancel}>
					Cancel
				</CancelButton>
			</NameAndDateForm>
		</Card>
	);
}

export { TaskEditor };
