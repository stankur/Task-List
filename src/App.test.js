import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

let container = null;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
	localStorage.clear();
});

it("initially has both TaskAdder and empty Tasks only", () => {
	render(<App />, container);

	expect(screen.getByText("CURRENT TASKS")).toBeInTheDocument();
	expect(screen.getByText("ADD TASK")).toBeInTheDocument();
	expect(screen.queryByText("EDIT TASK")).not.toBeInTheDocument();
	expect(screen.queryByText("Cancel")).not.toBeInTheDocument();
	expect(screen.queryByText("E")).not.toBeInTheDocument();
	expect(screen.queryByText("X")).not.toBeInTheDocument();
});

it("could add tasks properly", () => {
	render(<App />, container);

	const nameOfTaskToAdd = "Socialize";
	const dateOfTaskToAdd = "2020-05-06";

	const formattedDate = "06 May 2020";

	userEvent.type(screen.getByLabelText("NAME"), nameOfTaskToAdd);
	userEvent.type(screen.getByLabelText("DATE"), dateOfTaskToAdd);

	userEvent.click(screen.getByTestId("Submit"));

	expect(screen.getByText(nameOfTaskToAdd)).toBeInTheDocument();
	expect(screen.getByText("X")).toBeInTheDocument();
	expect(screen.getByRole("checkbox")).toBeInTheDocument();
	expect(screen.getByText(formattedDate)).toBeInTheDocument();

	const nameOfTaskToAdd2 = "Breathe";
	const dateOfTaskToAdd2 = "2020-02-06";

	const formattedDate2 = "06 Feb 2020";

	userEvent.clear(screen.getByLabelText("NAME"));
	userEvent.clear(screen.getByLabelText("DATE"));

	expect(screen.queryByText(nameOfTaskToAdd2)).not.toBeInTheDocument();
	expect(screen.queryByText(formattedDate2)).not.toBeInTheDocument();

	userEvent.type(screen.getByLabelText("NAME"), nameOfTaskToAdd2);
	userEvent.type(screen.getByLabelText("DATE"), dateOfTaskToAdd2);

	userEvent.click(screen.getByTestId("Submit"));

	expect(screen.getByText(nameOfTaskToAdd2)).toBeInTheDocument();
	expect(screen.getByText(formattedDate2)).toBeInTheDocument();
});

it("doesn't add task which already exists again", () => {
	render(<App />, container);

	const nameOfTaskToAdd = "Socialize";
	const dateOfTaskToAdd = "2020-05-06";

	const formattedDateToAdd = "06 May 2020";

	userEvent.type(screen.getByLabelText("NAME"), nameOfTaskToAdd);
	userEvent.type(screen.getByLabelText("DATE"), dateOfTaskToAdd);

	userEvent.click(screen.getByTestId("Submit"));

	expect(screen.getAllByText("Socialize").length).toBe(1);
	expect(screen.getAllByText(formattedDateToAdd).length).toBe(1);

	userEvent.clear(screen.getByLabelText("NAME"));
	userEvent.clear(screen.getByLabelText("DATE"));

	userEvent.type(screen.getByLabelText("NAME"), nameOfTaskToAdd);
	userEvent.type(screen.getByLabelText("DATE"), dateOfTaskToAdd);

	userEvent.click(screen.getByTestId("Submit"));

	expect(screen.getAllByText("Socialize").length).toBe(1);
	expect(screen.getAllByText(formattedDateToAdd).length).toBe(1);
});

it("could edit an existing properly", () => {
	render(<App />, container);

	const nameOfTaskToAdd = "Socialize";
	const dateOfTaskToAdd = "2020-05-06";

	userEvent.type(screen.getByLabelText("NAME"), nameOfTaskToAdd);
	userEvent.type(screen.getByLabelText("DATE"), dateOfTaskToAdd);

	userEvent.click(screen.getByTestId("Submit"));

	const nameOfTaskToAdd2 = "Breathe";
	const dateOfTaskToAdd2 = "2020-02-06";

	const formattedDateToAdd2 = "06 Feb 2020";

	userEvent.clear(screen.getByLabelText("NAME"));
	userEvent.clear(screen.getByLabelText("DATE"));

	expect(screen.queryByText(nameOfTaskToAdd2)).not.toBeInTheDocument();
	expect(screen.queryByText(formattedDateToAdd2)).not.toBeInTheDocument();

	userEvent.type(screen.getByLabelText("NAME"), nameOfTaskToAdd2);
	userEvent.type(screen.getByLabelText("DATE"), dateOfTaskToAdd2);

	userEvent.click(screen.getByTestId("Submit"));

	expect(screen.getAllByRole("checkbox").length).toBe(2);

	//now the editing part

	expect(screen.getAllByText("E").length).toBe(2);

	userEvent.click(screen.getAllByText("E")[0]);

	expect(screen.queryByText("ADD TASK")).not.toBeInTheDocument();
	expect(screen.getByText("EDIT TASK")).toBeInTheDocument();
	expect(screen.getByText("Cancel")).toBeInTheDocument();

	userEvent.clear(screen.getByLabelText("NAME"));
	userEvent.clear(screen.getByLabelText("DATE"));

	const replacementName = "Fly";
	const replacementDate = "2020-07-08";

	const formattedReplacementdate = "08 Jul 2020";

	userEvent.type(screen.getByLabelText("NAME"), replacementName);
	userEvent.type(screen.getByLabelText("DATE"), replacementDate);

	userEvent.click(screen.getByTestId("Submit"));

	expect(screen.queryByText(nameOfTaskToAdd2)).not.toBeInTheDocument();
	expect(screen.queryByText(formattedDateToAdd2)).not.toBeInTheDocument();

	expect(screen.getAllByRole("checkbox").length).toBe(2);

	expect(screen.getByText(replacementName)).toBeInTheDocument();
	expect(screen.getByText(formattedReplacementdate)).toBeInTheDocument();
});

it("renders empty input fields after a task is added", () => {
	render(<App />, container);

	const nameOfTaskToAdd = "Socialize";
	const dateOfTaskToAdd = "2020-05-06";

	userEvent.type(screen.getByLabelText("NAME"), nameOfTaskToAdd);
	userEvent.type(screen.getByLabelText("DATE"), dateOfTaskToAdd);

	userEvent.click(screen.getByTestId("Submit"));

	expect(screen.getByLabelText("NAME")).toHaveValue("");
	expect(screen.getByLabelText("DATE")).toHaveValue("");
});

it("renders with appropriate name and date values after edit request", () => {
	render(<App />, container);

	const nameOfTaskToAdd = "Socialize";
	const dateOfTaskToAdd = "2020-05-06";

	userEvent.type(screen.getByLabelText("NAME"), nameOfTaskToAdd);
	userEvent.type(screen.getByLabelText("DATE"), dateOfTaskToAdd);

	userEvent.click(screen.getByTestId("Submit"));

	const nameOfTaskToAdd2 = "Breathe";
	const dateOfTaskToAdd2 = "2020-02-06";

	const formattedDateToAdd2 = "06 Feb 2020";

	userEvent.clear(screen.getByLabelText("NAME"));
	userEvent.clear(screen.getByLabelText("DATE"));

	expect(screen.queryByText(nameOfTaskToAdd2)).not.toBeInTheDocument();
	expect(screen.queryByText(formattedDateToAdd2)).not.toBeInTheDocument();

	userEvent.type(screen.getByLabelText("NAME"), nameOfTaskToAdd2);
	userEvent.type(screen.getByLabelText("DATE"), dateOfTaskToAdd2);

	userEvent.click(screen.getByTestId("Submit"));

	expect(screen.getAllByRole("checkbox").length).toBe(2);

	//now the editing part

	expect(screen.getAllByText("E").length).toBe(2);

	userEvent.click(screen.getAllByText("E")[0]);

	expect(screen.getByLabelText("NAME")).toHaveValue("Breathe");
	expect(screen.getByLabelText("DATE")).toHaveValue(dateOfTaskToAdd2);
});

it("resets input fields after submit button is clicked", () => {
	render(<App />, container);

	const nameOfTaskToAdd = "Socialize";
	const dateOfTaskToAdd = "2020-05-06";

	userEvent.type(screen.getByLabelText("NAME"), nameOfTaskToAdd);
	userEvent.type(screen.getByLabelText("DATE"), dateOfTaskToAdd);

	userEvent.click(screen.getByTestId("Submit"));

	expect(screen.getByLabelText("NAME")).toHaveValue("");
	expect(screen.getByLabelText("DATE")).toHaveValue("");
});
