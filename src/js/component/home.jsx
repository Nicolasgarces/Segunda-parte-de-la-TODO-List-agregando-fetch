import React, { useState, useEffect } from "react";

const Home = () => {
	const [tarea, setTarea] = useState("");
	const [lista, setLista] = useState([]);

	const guardarDatos = (e) => {
		e.preventDefault();
		setLista([...lista, { id: lista.length, nombre: tarea }]);
		setTarea("");
	};

	const borrarDatos = (id) => {
		const listaActualizada = lista.filter((item) => item.id !== id);
		setLista(listaActualizada);
	};
	useEffect(() => {
		const getTodos = () => {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/nicolasgarces",
				{
					method: "GET",
					body: JSON.stringify(getTodos),
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
				.then((resp) => {
					console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
					console.log(resp.status); // el código de estado = 200 o código = 400 etc.
					console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
					return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
				})
				.then((data) => {
					//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
					console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
				})
				.catch((error) => {
					//manejo de errores
					console.log(error);
				});
		};
		getTodos();

		/*put*/

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/nicolasgarces",
			{
				method: "PUT",
				body: JSON.stringify(setLista),
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((resp) => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	}, []);

	return (
		<div className="container-md mt-5">
			<form onSubmit={guardarDatos}>
				{" "}
				<div className="form-group ">
					<h1 className="d-flex justify-content-center">TODOS</h1>
					<input
						type="text"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Escribe una tarea"
						onChange={(e) => setTarea(e.target.value)}
						value={tarea}
					/>
					<ul className="list-group list-group-flush">
						{lista.map((item) => (
							<li
								className=" lista list-group-item mt-1 mb-1 "
								key={item.id}>
								{" "}
								{item.nombre}{" "}
								<i
									className="bi bi-x-lg position-absolute top-40 end-0"
									onClick={() => borrarDatos(item.id)}></i>
							</li>
						))}
					</ul>
				</div>
			</form>
		</div>
	);
};

export default Home;
