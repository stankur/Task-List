import React from "react";
import "./style.css";
import styled from "styled-components";
import { transparentize } from "polished";

const ProgressBarContainer = styled.div`
	height: 20px;
	width: 100%;

	border-style: solid;
	border-radius: 5px;
	border-width: 1px;
	border-color: ${(props) => props.theme.greeny};
`;

const ProgressBar = styled.div`
	height: 20px;

	width: ${(props) => props.donePercentageString};

	transform: translate(-1px, -1px);

	border-style: solid;
	border-radius: 5px;
	border-width: 1px;
	border-color: ${(props) => props.theme.greeny};
	background-color: ${(props) =>
		transparentize((100 - props.donePercentage) / 100, props.theme.greeny)};

	transition: width 300ms ease-in-out, background-color 300ms ease-in-out;
`;

function Statistics({ numTasksDone, numAllTasks, theme }) {
	const getDonePercentage = () => {
		const theoreticalPercentage = Math.floor(
			(numTasksDone / numAllTasks) * 100
		);

		if (isNaN(theoreticalPercentage)) {
			return 0;
		}

		return theoreticalPercentage;
	};

	const getLowerBoundedDonePercentage = (lowerBound) => {
		return Math.max(getDonePercentage(), lowerBound);
	};

	return (
		<div className="card-container">
			<div className="card-description description-stats">STATISTICS</div>
			<div className="card-content content-stats">
				<ProgressBarContainer theme={theme}>
					<ProgressBar
						theme={theme}
						donePercentageString={
							getLowerBoundedDonePercentage(2).toString() + "%"
						}
						donePercentage={getLowerBoundedDonePercentage(10)}
					></ProgressBar>
				</ProgressBarContainer>
				<div> num tasks done = {numTasksDone} </div>
				<div> num all tasks = {numAllTasks} </div>
				<div> done percentage = {getDonePercentage()} </div>
			</div>
		</div>
	);
}

export { Statistics };
