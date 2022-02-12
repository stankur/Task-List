import React, { useState } from "react"
import { parse } from "date-fns"
import './style.css'
import '../card-style.css'

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

        setName("");
        setDate("");

    };

    return (
        <div className="card-container">
            <div className="card-description description-task-adder">ADD TASK</div>
            <div className="card-content form">
                <form data-testid="form" onSubmit={onSubmit}>
                    <label htmlFor="name">NAME </label>
                    <input type="text" value={name} onChange={onNameChange} id="name" />
                    <label htmlFor="date">DATE </label>
                    <input type="date" value={date} onChange={onDateChange} id="date" />
                    <input type="submit" data-testid="submit"/>
                </form>
            </div>
        </div>
    );
}


export { TaskAdder }