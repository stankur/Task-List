import styled from "styled-components";

const smallGap = "8px";
const smallFont = "14px";
const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`;

const leftPush = "10px";
const topPush = smallGap;
const Description = styled.div`
	position: absolute;
	width: calc(100% - (2 * ${leftPush}));
	height: calc(100% - (2 * ${topPush}));
	background-color: ${(props) => props.theme.lightGray};

	border-style: solid;
	border-radius: 10px;
	border-width: 1px;
	border-color: ${(props) => props.color};
	color: ${(props) => props.color};

	padding-top: ${topPush};
	padding-bottom: ${topPush};
	padding-left: ${leftPush};
	padding-right: ${leftPush};

	font-family: ${(props) => props.theme.roundyFont}, sans-serif;
`;

const push = "10px";
const fontSize = "12px";
const Content = styled.div`
	top: calc((2 * ${smallGap}) + ${smallFont});

	padding: ${push};
	width: calc(100% - (2 * ${push}));
	height: calc(100% - (2 * ${smallGap}) - ${smallFont} - (2 * ${push}));

	border-style: solid;
	border-radius: 10px;
	border-width: 1px;
	border-color: ${(props) => props.color};

	position: absolute;

	background-color: ${(props) => props.theme.semiDark};
	font-family: ${(props) => props.theme.roundyFont}, sans-serif;
	font-size: ${fontSize};
`;

function Card(props) {
	return (
		<Container className={props.className}>
			<Description color={props.color} theme={props.theme}>
				{props.description}
			</Description>
			<Content color={props.color} theme={props.theme}>
				{props.children}
			</Content>
		</Container>
	);
}

export default Card;
