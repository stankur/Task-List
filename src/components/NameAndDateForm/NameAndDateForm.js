import React from "react";
import styled from "styled-components";

import { lighten } from "polished";
import "./style.css";

const Form = styled.form`
	position: relative;
	width: 100%;
	height: 100%;
`;

const Label = styled.label`
	display: block;
	margin-bottom: 5px;
	color: ${(props) => props.theme.greeny};
`;

const Input = styled.input`
	font-family: ${(props) => props.theme.roundyFont}, sans-serif;
	font-size: 13px;
	color: ${(props) => props.theme.white};

	box-sizing: border-box;

	display: block;

	padding: 2px;
	margin-left: 0px;
	margin-right: 0px;
	margin-bottom: 10px;

	width: 100%;

	background-color: ${(props) => props.theme.semiLightGray};
	border-style: solid;
	border-radius: 5px;
	border-width: 1px;
	border-color: ${(props) => props.theme.greeny};
`;

const ownPadding = "6px";
const width = `max(calc(6ch + (2 * ${ownPadding})), 20%)`;
const SubmitButton = styled(Input).attrs(() => ({
	type: "submit",
}))`
	position: absolute;
	right: 0;
	bottom: 0;
	margin-bottom: 0px;

	width: ${width};
	padding: ${ownPadding};

	background-color: ${(props) => props.theme.semiDark};
	color: ${(props) => props.theme.greeny};

	transition: background-color 200ms ease-in-out;

	&:hover {
		background-color: ${(props) => lighten(0.05, props.theme.semiDark)};
	}
`;

function NameAndDateForm({
	theme,
	name,
	onNameChange,
	date,
	submit,
	onDateChange,
	children,
}) {
	return (
		<Form data-testid="form" onSubmit={submit}>
			<Label htmlFor="name">NAME </Label>
			<Input
				theme={theme}
				type="text"
				value={name}
				onChange={onNameChange}
				id="name"
			/>
			<Label htmlFor="date">DATE </Label>
			<Input
				theme={theme}
				type="date"
				value={date}
				onChange={onDateChange}
				id="date"
			/>
			<SubmitButton theme={theme} data-testid="Submit" />
			{children}
		</Form>
	);
}

export default NameAndDateForm;
