import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskEditor } from './TaskEditor'

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

    render(<TaskEditor />, container);

    expect(screen.getByLabelText("Name:")).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByLabelText("Date:")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
});
