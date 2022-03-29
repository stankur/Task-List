import React from "react";
import styled from "styled-components";
import { transparentize, darken, mix, rgb } from "polished";

import Card from "../../Card";

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

const AnimatedStat = styled.div`
	color: ${(props) => darken(0.05, props.theme.greeny)};
	font-family: ${(props) => props.theme.roundyFont}, sans-serif;
	font-size: 14px;
	text-align: center;
	margin-top: 7px;

	width: 50%;
	display: inline-block;

	&::after {
		content: "${(props) => props.stat}";
		display: block;
		margin-top: 3px;
		font-family: ${(props) => props.theme.roundyFont}, sans-serif;
		font-size: 20px;
		color: ${(props) => darken(0.2, props.theme.white)};
	}
`;

const AnimatedCompletion = styled.div`
	color: ${(props) => darken(0.05, props.theme.greeny)};
	font-family: ${(props) => props.theme.roundyFont}, sans-serif;
	font-size: 17px;
	text-align: center;
	margin-top: 7px;

	&::after {
		content: "${(props) => props.stat}%";
		display: block;
		margin-top: 3px;
		font-family: ${(props) => props.theme.roundyFont}, sans-serif;
		font-size: 25px;
		color: ${(props) =>
			mix(props.stat / 100, props.theme.greeny, rgb(235, 97, 97))};

		transition: color 200ms ease-in-out;
	}
`;

function Statistics({ numTasksDone, numAllTasks, theme, className }) {
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
		<Card
			theme={theme}
			color={theme.greeny}
			className={className}
			description="STATISTICS"
		>
			<ProgressBarContainer theme={theme}>
				<ProgressBar
					theme={theme}
					donePercentageString={
						getLowerBoundedDonePercentage(2).toString() + "%"
					}
					donePercentage={getLowerBoundedDonePercentage(10)}
				></ProgressBar>
			</ProgressBarContainer>
			<AnimatedStat theme={theme} stat={numTasksDone}>
				{" "}
				Done{" "}
			</AnimatedStat>
			<AnimatedStat theme={theme} stat={numAllTasks}>
				{" "}
				Total{" "}
			</AnimatedStat>
			<AnimatedCompletion theme={theme} stat={getDonePercentage()}>
				{" "}
				Completion{" "}
			</AnimatedCompletion>
		</Card>
	);
}

export { Statistics };
