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
			users: [],
			user: "",
			tareas: [],
			tarea: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
		this.handleUser = this.handleUser.bind(this);
		this.handleUserSubmit = this.handleUserSubmit.bind(this);
		this.handleFetch = this.handleFetch.bind(this);
	}

	handleChange(e) {
		this.setState({ tarea: e.target.value });
	}
	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			tareas: this.state.tareas.concat(this.state.tarea)
		});
		this.handleFetch();
	}
	handleUser(e) {
		this.setState({ user: e.target.value });
	}
	handleUserSubmit(e) {
		e.preventDefault();
		this.setState({
			users: this.state.users.concat(this.state.user),
			user: ""
		});
		console.log("usuario", this.state.user);
		console.log("usuarios", this.state.users);
		this.handleFetch(this.state.user);
	}
	handleFetch() {
		let todos = this.setData();
		fetch("https://assets.breatheco.de/apis/fake/todos/user/laura", {
			method: "put",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.parse(todos)
		})
			.then(resp => resp.json()) // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			.then(data => {
				//here is were your code should start after the fetch finishes
				if (data.length >= 0) {
					console.log("hola");
				} else {
					console.log("hola");
				}
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	}

	setData() {
		let todos = this.state.tareas;
		let newTodos = todos.map(function(item) {
			return { label: item, done: false };
		});
		console.log(newTodos);
		return newTodos;
	}

	removeTodo(index) {
		let { tareas } = this.state;
		tareas.splice(index, 1);
		this.setState({
			tareas: tareas
		});
	}
	componentDidMount(user) {
		const tareas = this.state.tareas;
	}
	render() {
		return (
			<div>
				<form id="addUser" onSubmit={this.handleUserSubmit}>
					<h1>todos</h1>
					<input
						placeholder={
							this.state.users.length > 0
								? "Add a user"
								: "No user, add a user"
						}
						type="text"
						value={this.state.user}
						name="tarea"
						onChange={this.handleUser}
					/>
					<button>User</button>
				</form>
				<form id="addToDo" onSubmit={this.handleSubmit}>
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
					<button onClick={this.handleSubmit}>Add</button>
				</form>
				<ul>
					{this.state.tareas.map((item, index) => (
						<li key={index}>
							{" "}
							{item}
							<i
								id="tareas"
								onClick={e => {
									this.removeTodo(index);
								}}>
								&times;
							</i>
						</li>
					))}
				</ul>
			</div>
		);
	}
}
