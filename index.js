const { request, response } = require("express");
const cors = require('cors')
// http://localhost:3001/api/persons

const express = require("express");
const morgan = require('morgan');
const app = express();

morgan.token('body', function getBody(req){
	return JSON.stringify(req.body)
})

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
// morgan(function(tokens, req, res) {
// 	return[
// 	tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
// 	tokens['response-time'](req, res), 'ms',
// 	tokens.body(req, res)
// 	].join(' ')
// }
// )
// 

let persons = [
	{
		
		id: 0,
		name: "A",
		number: "1",
	},
	{
		id: 1,
		name: "wAw",
		number: "14",
	},
	{
		id: 2,
		name: "Av",
		number: "12",
	},
];

app.get("/api/persons", (request, response) => {
	response.json(persons);
});

app.get("/info", (request, response) => {
	console.log(request.Date);
	response.send(
		`<div>Phonebook has info for ${
			persons.length
		} people</div><div>${new Date()}</div>`
	);
});

app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);

	const person = persons.find((person) => person.id === id);

	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((person) => person.id !== id);

	response.status(204).end();
});

app.post("/api/persons", (request, response) => {
	const body = request.body;

	if (!body.name) {
		return response.status(400).json({
			error: "name is missing",
		});
	}

	if (!body.number) {
		return response.status(400).json({
			error: "number is missing",
		});
	}

	if (persons.map((person) => person.name) === (body.name)) {
		return response.status(400).json({
			error: "name must be unique",
		});
	}

	const person = {
		name: body.name,
		number: body.number,
		date: new Date(),
		id: Math.floor(Math.random()) * 100,
	};

	console.log(`person------> ${person}`)

	persons=persons.concat(person)
	response.json(person);
});



app.put("/api/persons/:id", (request, response) => {
	const body = request.body;
	id = Number(request.params.id)

	if (!body.name) {
		return response.status(400).json({
			error: "name is missing",
		});
	}

	if (!body.number) {
		return response.status(400).json({
			error: "number is missing",
		});
	}

	// if (persons.map((person) => person.name).includes(body.name)) {
	// 	return response.status(400).json({
	// 		error: "name must be unique",
	// 	});
	// }
 
	const person = {
		name: body.name,
		number: body.number,
		date: new Date(),
		id: id,
	};

	// console.log(`person------> ${person}`)
	persons = persons.map(per => per.id === id ? person : per)
	response.json(person);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
