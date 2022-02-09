import React, { useState, useEffect } from "react";

const Home = () => {
	const [tarea, setTarea] = useState("");
	const [lista, setLista] = useState([]);

	const guardarDatos = (e) => {
		/*esta es la funcion agregar*/
		e.preventDefault();
		// console.log(lista);
		setLista([...lista, { label: tarea, done: false }]);
		actualizarLista([...lista, { label: tarea, done: false }]);
		setTarea("");
	};

	const borrarDatos = (label) => {
		/*esta es la funcion eliminar*/
		const listaAct = lista.filter((item) => item.label !== label);
		actualizarLista(listaAct);
		setLista(listaAct);
		console.log(listaAct);
	};

	function actualizarLista(listaAct) {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/nicolasgarces",
			{
				method: "PUT",
				body: JSON.stringify(listaAct),
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((resp) => {
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.catch((error) => {
				//manejo de errores
				console.log(error);
			});
	}

	function obtenerLista() {
		/* funcion para obtener los datos del get */
		fetch("https://assets.breatheco.de/apis/fake/todos/user/nicolasgarces")
			.then((response) => response.json())
			.then((data) => setLista(data));
	}

	useEffect(() => {
		//codigo que quiero que se ejecute
		obtenerLista();
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
						{lista.map((item, index) => (
							<li
								className=" lista list-group-item mt-1 mb-1 "
								key={index}>
								{" "}
								{item.label}{" "}
								<i
									className="bi bi-x-lg position-absolute top-40 end-0"
									onClick={() => borrarDatos(item.label)}></i>
							</li>
						))}
					</ul>
				</div>
			</form>
			<p>{lista.length} Items Left</p>
		</div>
	);
};

export default Home;
