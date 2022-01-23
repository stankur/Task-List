import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskEditor } from './TaskEditor'
import { isEqual, parse } from 'date-fns'

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

it('has all the relevant things', () => {
    const mockOnSubmit = jest.fn();
    const mockOnCancel = jest.fn();

    render(<TaskEditor name="poop" dateString="2022-01-02" onSubmit={mockOnSubmit} onCancel={mockOnCancel}/>, container);

    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    expect(screen.getByLabelText("Name:")).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByLabelText("Date:")).toBeInTheDocument();
    expect(screen.getByTestId("submit")).toBeInTheDocument();
    expect(screen.getByText("cancel")).toBeInTheDocument();
});

it('renders initial task info at the beginning', () => {
    const mockOnSubmit = jest.fn();
    const mockOnCancel = jest.fn();

    render(<TaskEditor name="Cook" dateString="2021-02-03" onSubmit={mockOnSubmit} onCancel={mockOnCancel}/>, container);

    expect(screen.getByLabelText("Name:")).toHaveValue("Cook");
    expect(screen.getByLabelText("Date:")).toHaveValue("2021-02-03");
});

it('calls the props.onSubmit correctly when submit is clicked', () => {
    const mockOnSubmit = jest.fn();
    const mockOnCancel = jest.fn();

    render(<TaskEditor name="Exercise" dateString="2020-04-09" onSubmit={mockOnSubmit} onCancel={mockOnCancel}/>);

    expect(mockOnSubmit.mock.calls.length).toBe(0);

    const name = "Study";
    const dateString = "2021-02-07"

    const date = parse(dateString, "yyyy-MM-dd", new Date());

    userEvent.clear(screen.getByLabelText("Name:"));
    userEvent.clear(screen.getByLabelText("Date:"));

    userEvent.type(screen.getByLabelText("Name:"), name);
    userEvent.type(screen.getByLabelText("Date:"), dateString);
  
    userEvent.click(screen.getByTestId("submit"));

    expect(mockOnSubmit.mock.calls.length).toBe(1);
    expect(mockOnSubmit.mock.calls[0][0].name).toBe(name);
    expect(isEqual(date, mockOnSubmit.mock.calls[0][0].date)).toBe(true);
});

it('calls onCancel correctly when cance is clicked', () => {
    const mockOnSubmit = jest.fn();
    const mockOnCancel = jest.fn();

    render(<TaskEditor name="Exercise" dateString="2020-04-09" onSubmit={mockOnSubmit} onCancel={mockOnCancel}/>);

    expect(mockOnCancel.mock.calls.length).toBe(0);

    const name = "Study";
    const dateString = "2021-02-07"

    userEvent.clear(screen.getByLabelText("Name:"));
    userEvent.clear(screen.getByLabelText("Date:"));
    
    userEvent.type(screen.getByLabelText("Name:"), name);
    userEvent.type(screen.getByLabelText("Date:"), dateString);
  
    userEvent.click(screen.getByText("cancel"));

    expect(mockOnCancel.mock.calls.length).toBe(1);
});


