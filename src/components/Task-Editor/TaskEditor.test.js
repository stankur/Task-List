import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskEditor } from "./TaskEditor";
import { isEqual, parse } from "date-fns";

let container = null;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it("has all the relevant things", () => {
	const mockOnSubmit = jest.fn();
	const mockOnCancel = jest.fn();

	render(
		<TaskEditor
			taskName="poop"
			taskDate={new Date("2022-01-02")}
			onSubmit={mockOnSubmit}
			onCancel={mockOnCancel}
		/>,
		container
	);

	expect(screen.getByText("EDIT TASK")).toBeInTheDocument();
	expect(screen.getByLabelText("NAME")).toBeInTheDocument();
	expect(screen.getByRole("textbox")).toBeInTheDocument();
	expect(screen.getByLabelText("DATE")).toBeInTheDocument();
	expect(screen.getByTestId("Submit")).toBeInTheDocument();
	expect(screen.getByText("Cancel")).toBeInTheDocument();
});

it("renders initial task info at the beginning", () => {
	const mockOnSubmit = jest.fn();
	const mockOnCancel = jest.fn();

	render(
		<TaskEditor
			taskName="Cook"
			taskDate={parse("2021-02-03", "yyyy-MM-dd", new Date())}
			onSubmit={mockOnSubmit}
			onCancel={mockOnCancel}
		/>,
		container
	);

	expect(screen.getByLabelText("NAME")).toHaveValue("Cook");
	expect(screen.getByLabelText("DATE")).toHaveValue("2021-02-03");
});

it("calls the props.onSubmit correctly when submit is clicked", () => {
	const mockOnSubmit = jest.fn();
	const mockOnCancel = jest.fn();

	render(
		<TaskEditor
			taskName="Exercise"
			taskDate={parse("2020-04-09", "yyyy-MM-dd", new Date())}
			onSubmit={mockOnSubmit}
			onCancel={mockOnCancel}
		/>,
		container
	);

	expect(mockOnSubmit.mock.calls.length).toBe(0);

	const name = "Study";
	const dateString = "2021-02-07";

	const date = parse(dateString, "yyyy-MM-dd", new Date());

	userEvent.clear(screen.getByLabelText("NAME"));
	userEvent.clear(screen.getByLabelText("DATE"));

	userEvent.type(screen.getByLabelText("NAME"), name);
	userEvent.type(screen.getByLabelText("DATE"), dateString);

	userEvent.click(screen.getByTestId("Submit"));

	expect(mockOnSubmit.mock.calls.length).toBe(1);
	expect(mockOnSubmit.mock.calls[0][0].name).toBe(name);
	expect(isEqual(date, mockOnSubmit.mock.calls[0][0].date)).toBe(true);
});

it("calls onCancel correctly when cance is clicked", () => {
	const mockOnSubmit = jest.fn();
	const mockOnCancel = jest.fn();

	render(
		<TaskEditor
			taskName="Exercise"
			taskDate={parse("2020-04-09", "yyyy-MM-dd", new Date())}
			onSubmit={mockOnSubmit}
			onCancel={mockOnCancel}
		/>,
		container
	);

	expect(mockOnCancel.mock.calls.length).toBe(0);

	const name = "Study";
	const dateString = "2021-02-07";

	userEvent.clear(screen.getByLabelText("NAME"));
	userEvent.clear(screen.getByLabelText("DATE"));

	userEvent.type(screen.getByLabelText("NAME"), name);
	userEvent.type(screen.getByLabelText("DATE"), dateString);

	userEvent.click(screen.getByText("Cancel"));

	expect(mockOnCancel.mock.calls.length).toBe(1);
});
