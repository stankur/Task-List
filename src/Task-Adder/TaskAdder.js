import React, { useState } from "react"
import { parse } from "date-fns"

function TaskAdder(props) {

    const [ name, setName ] = useState("");
    const [ date, setDate ] = useState("");

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

    return (
        <div>
            <div>Add Task</div>
            <form data-testid="form" onSubmit={onSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" value={name} onChange={onNameChange} id="name" />
                <label htmlFor="date">Date: </label>
                <input type="date" value={date} onChange={onDateChange} id="date" />
                <input type="submit" />
            </form>
        </div>
    );
}


export { TaskAdder }