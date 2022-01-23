import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskBar } from './TaskBar'

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

it("has all interactive buttons", () => {
    const mockOnXClick = jest.fn();
    const mockOnEClick = jest.fn();

    render(<TaskBar name="Breathe" dateString="21 Feb 2021" onXClick={mockOnXClick} onEClick = {mockOnEClick}/>, container);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByText("x")).toBeInTheDocument();
    expect(screen.getByText("E")).toBeInTheDocument();
});

it("shows correct info independent of date format (1)", () => {
    const mockOnXClick = jest.fn();
    const mockOnEClick = jest.fn();

    render(<TaskBar name="Eat" dateString="25 Feb 2021" onXClick={mockOnXClick} onEClick = {mockOnEClick}/>, container);
    expect(screen.getByText("Eat")).toBeInTheDocument();
    expect(screen.getByText("25 Feb 2021")).toBeInTheDocument();
});

it("shows correct info independent of date format (2)", () => {
    const mockOnXClick = jest.fn();
    const mockOnEClick = jest.fn();

    render(<TaskBar name="Eat" dateString="25/2/2021" onXClick={mockOnXClick} onEClick = {mockOnEClick}/>, container);
    expect(screen.getByText("Eat")).toBeInTheDocument();
    expect(screen.getByText("25/2/2021")).toBeInTheDocument();
});

it("calls correct function on x Icon clicked", () => {
    const mockOnXClick = jest.fn();
    const mockOnEClick = jest.fn();

    render(<TaskBar name="Eat" dateString="25/2/2021" onXClick={mockOnXClick} onEClick = {mockOnEClick} />, container)
    
    expect(mockOnXClick.mock.calls.length).toBe(0);
    userEvent.click(screen.getByText("x"));
    expect(mockOnXClick.mock.calls.length).toBe(1);

});

it("calls correct function on edit Icon clicked", () => {
    const mockOnXClick = jest.fn();
    const mockOnEClick = jest.fn();

    render(<TaskBar name="Eat" dateString="25/2/2021" onXClick={mockOnXClick} onEClick = {mockOnEClick} />, container);

    expect(mockOnEClick.mock.calls.length).toBe(0);
    userEvent.click(screen.getByText("E"));
    expect(mockOnEClick.mock.calls.length).toBe(1);

});


