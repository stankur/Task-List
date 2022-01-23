import React, { useState } from 'react'
import { parse } from 'date-fns'

function TaskEditor(props) {

    const [ name, setName ] = useState(props.name);
    const [ date, setDate ] = useState(props.dateString);

    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const onDateChange = (event) => {
        setDate(event.target.value);
    };

    const propsOnSubmit = props.onSubmit;

    const onSubmit = (event) => {
        event.preventDefault();

        if (date) {
        const parsedDate = parse(date, "yyyy-MM-dd", new Date());
        propsOnSubmit({ name:name , date:parsedDate });
        } else {
            propsOnSubmit({ name:name, date:"" });
        }

    };

    const propsOnCancel = props.onCancel;

    const onCancel = (event) => {
        event.preventDefault();

        propsOnCancel();
    }

    return (
        <div>
            <div>Edit Task</div>
            <form data-testid="form" onSubmit={onSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" value={name} onChange={onNameChange} id="name" />
                <label htmlFor="date">Date: </label>
                <input type="date" value={date} onChange={onDateChange} id="date" />
                <button onClick={onCancel}> cancel </button>
                <input type="submit" data-testid="submit"/>
            </form>
        </div>
    );
}

export { TaskEditor }