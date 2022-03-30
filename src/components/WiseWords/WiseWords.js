import React, { useEffect, useState } from "react";
import Card from "../../Card";

import { darken, transparentize } from "polished";
import styled from "styled-components";

const QuoteTextHolder = styled.div`
	width: 90%;
	word-wrap: break-word;

	color: ${(props) => darken(0.15, props.theme.white)};
	font-family: sans-serif;
	font-size: 16px;

	margin: 20px auto;

	text-align: center;
	line-height: 120%;
`;

const AuthorNameHolder = styled.div`
	color: ${(props) => darken(0.15, props.theme.white)};
	font-family: sans-serif;
	font-size: 14px;

	text-align: center;

	width: 90%;
	margin: 0 auto;

	padding: 5px;
	border-radius: 2px;
	background-color: ${(props) => transparentize(0.6, props.theme.lightGray)};
`;

function WiseWords({ theme, className }) {
	const [quote, setQuote] = useState({
		author: "Stanley",
		text: "U are Spongebob",
	});

	useEffect(() => {
		const api_url = "http://localhost:8010/proxy/api/quotes/";

		async function getapi(url) {
			const response = await fetch(url);
			var data = await response.json();
			console.log(data);
			var quote = data[0];
			var quoteAuthor = quote.a;
			var quoteText = quote.q;
			setQuote({ author: quoteAuthor, text: quoteText });
		}

		const timer = setInterval(() => getapi(api_url), 10000);

		return () => clearInterval(timer);
	});

	return (
		<Card
			theme={theme}
			color={theme.greeny}
			className={className}
			description="WISE WORDS"
		>
			<QuoteTextHolder>{quote.text}</QuoteTextHolder>
			<AuthorNameHolder>{quote.author}</AuthorNameHolder>
		</Card>
	);
}

export { WiseWords };
