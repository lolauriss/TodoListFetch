import React from "react";

import "./ToDo.css";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Tareas } from "./tareas";

//create your first component
export class Home extends React.Component {
	constructor() {
		super();

		this.state = {
			tareas: [],
			tarea: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
	}

	handleChange(e) {
		this.setState({ tarea: e.target.value });
	}
	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			tareas: this.state.tareas.concat(this.state.tarea),
			tarea: ""
		});
	}
	removeTodo(index) {
		let { tareas } = this.state;
		tareas.splice(index, 1);
		this.setState({
			tareas: tareas
		});
	}
	componentDidMount() {
		const tareas = this.state.tareas;
		fetch("http://assets.breatheco.de/apis/fake/todos/user/lolauriss", {
			method: "GET",
			body: JSON.stringify(tareas),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	}
	render() {
		return (
			<div>
				<form id="addToDo" onSubmit={this.handleSubmit}>
					<h1>todos</h1>
					<input
						placeholder={
							this.state.tareas.length > 0
								? "Add a task"
								: "No tasks, add a task"
						}
						type="text"
						value={this.state.tarea}
						name="tarea"
						onChange={this.handleChange}
					/>
					<button>Add</button>
				</form>
				<ul>
					{this.state.tareas.map((item, index) => (
						<li key={index}>
							{" "}
							{item}{" "}
							<button
								id="tareas"
								onClick={e => {
									this.removeTodo(index);
								}}>
								{" "}
								&times;
							</button>
						</li>
					))}
				</ul>
			</div>
		);
	}
}
