import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskAdder } from "./TaskAdder";
import { parse, isEqual } from "date-fns";

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

	render(<TaskAdder onSubmit={mockOnSubmit} />, container);

	expect(screen.getByText("ADD TASK")).toBeInTheDocument();
	expect(screen.getByLabelText("NAME")).toBeInTheDocument();
	expect(screen.getByRole("textbox")).toBeInTheDocument();
	expect(screen.getByLabelText("DATE")).toBeInTheDocument();
	expect(screen.getByRole("button")).toBeInTheDocument();
});

it("renders empty at the beginning", () => {
	const mockOnSubmit = jest.fn();

	render(<TaskAdder onSubmit={mockOnSubmit} />, container);

	expect(screen.getByLabelText("NAME")).toHaveValue("");
	expect(screen.getByLabelText("DATE")).toHaveValue("");
});

it("gives the correct name date pair upon submission", () => {
	const mockOnSubmit = jest.fn();

	render(<TaskAdder onSubmit={mockOnSubmit} />, container);

	const name = "Johnny";
	const dateString = "2021-09-03";

	const date = parse(dateString, "yyyy-MM-dd", new Date());

	expect(mockOnSubmit.mock.calls.length).toBe(0);

	userEvent.type(screen.getByLabelText("NAME"), name);
	userEvent.type(screen.getByLabelText("DATE"), dateString);
	userEvent.click(screen.getByRole("button"));

	expect(mockOnSubmit.mock.calls.length).toBe(1);

	expect(mockOnSubmit.mock.calls[0][0].name).toEqual(name);
	expect(isEqual(date, mockOnSubmit.mock.calls[0][0].date)).toBe(true);
});

it("gives the correct name date pair upon empty date submission", () => {
	const mockOnSubmit = jest.fn();

	render(<TaskAdder onSubmit={mockOnSubmit} />, container);

	const name = "Johnny";

	expect(mockOnSubmit.mock.calls.length).toBe(0);

	userEvent.type(screen.getByLabelText("NAME"), name);
	userEvent.click(screen.getByRole("button"));

	expect(mockOnSubmit.mock.calls.length).toBe(1);

	expect(mockOnSubmit.mock.calls[0][0].name).toEqual(name);
	expect(mockOnSubmit.mock.calls[0][0].date).toBe("");
});
