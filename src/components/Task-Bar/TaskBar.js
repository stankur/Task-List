import React from "react";

import styled from "styled-components";

const fontSize = "20px";
const taskBarHeight = "8%";
const smallGap = "10px";
const TaskBarContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;

	width: 100%;
	height: ${taskBarHeight};

	box-sizing: border-box;
	margin-bottom: 10px;

	border-radius: 5px;
	border-color: ${(props) => props.theme.bluey};
	border-width: 1px;
	border-style: solid;

	padding: ${smallGap};
	gap: ${smallGap};

	font-family: sans-serif;
	font-size: ${fontSize};
	color: ${(props) => props.theme.white};
`;

const approximateHeight = `calc(${fontSize} + (2 * ${smallGap}))`;
const CheckBox = styled.label`
	width: ${approximateHeight};
	height: ${approximateHeight};

	border-radius: 5px;
	border-color: ${(props) => props.theme.bluey};
	border-width: 1px;
	border-style: solid;

	position: relative;

	background-color: ${(props) => props.theme.semiLightGray};
`;

const TaskName = styled.span`
	flex-grow: 1;

	border-radius: 5px;
	padding: 10px;

	text-align: left;
	letter-spacing: 0.5px;

	background-color: ${(props) => props.theme.semiLightGray};
`;

const HiddenRealCheckBox = styled.input.attrs((props) => ({
	type: "checkbox",
	id: props.id,
}))`
	position: absolute;
	left: -100vw;
`;

const CheckBoxContent = styled.span`
	display: block;
	position: absolute;

	left: 50%;
	top: 50%;

	color: ${(props) => props.theme.bluey};

	transform: translate(-50%, -50%);

	opacity: ${(props) => (props.isChecked ? 1 : 0)};
	transition: opacity 100ms ease-in-out;
`;

function TaskBar({
	name,
	dateString,
	onXClick,
	onEClick,
	isChecked,
	onCheck,
	id,
	theme,
}) {
	const onCheckBoxClick = () => {
		onCheck();
	};

	return (
		<TaskBarContainer theme={theme}>
			<CheckBox
				htmlFor={id}
				className="checkbox"
				onClick={onCheckBoxClick}
			>
				<CheckBoxContent isChecked={isChecked}>✓</CheckBoxContent>
			</CheckBox>
			<HiddenRealCheckBox />
			<TaskName>{name}</TaskName>
			<span>{dateString}</span>
			<button id="x" onClick={onXClick}>
				X
			</button>
			<button id="E" onClick={onEClick}>
				E
			</button>
		</TaskBarContainer>
	);
}

export { TaskBar };
