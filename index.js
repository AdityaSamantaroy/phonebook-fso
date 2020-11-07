// http://localhost:3001/api/persons

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!


require('dotenv').config()
const cors = require('cors')
// const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
// const { update } = require('./models/phonebook')
const app = express()

const Person = require('./models/phonebook')

morgan.token('body', function getBody(req){
	return JSON.stringify(req.body)
})

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

////////////////////
app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		if(persons){
			response.json(persons)
		}
		else {
			response.status(404).end()
		}
	})
		.catch(error => {
			console.log(error)
			response.status(500).end()
		})

})
//////////////////
app.get('/info', (request, response) => {
	console.log(request.Date)
	response.send(
		`<div>Phonebook has info for ${
			Person.find({}).count.length
		} people</div><div>${new Date()}</div>`
	)
})


app.get('/api/persons/:id', (request, response, next) => {
	const id = request.params.id

	Person.findById(id).then(person => {
		if(person){
			response.json(person)
		}
		else {
			response.status(404).end()
		}
	})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	// persons = persons.filter((person) => person.id !== id);

	Person.findByIdAndDelete(id)
		.then(result => {
			console.log(`deleted ${result}`)
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	if (!body.name) {
		return response.status(400).json({
			error: 'name is missing',
		})
	}

	if (!body.number) {
		return response.status(400).json({
			error: 'number is missing',
		})
	}

	// if (persons.map((person) => person.name) === (body.name)) {
	// 	return response.status(400).json({
	// 		error: "name must be unique",
	// 	});
	// }

	const person = new Person({
		name: body.name,
		number: body.number,
		date: new Date(),
		// id: Math.floor(Math.random()) * 100,
	})

	console.log(`person------> ${person}`)

	// persons=persons.concat(person)
	person.save().then(savedNote => {
		response.json(savedNote)
	})
		.catch(error => next(error))
	// response.json(person);
})



app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body
	const id = request.params.id

	if (!body.name) {
		return response.status(400).json({
			error: 'name is missing',
		})
	}

	if (!body.number) {
		return response.status(400).json({
			error: 'number is missing',
		})
	}

	const person = {
		name: body.name,
		number: body.number,
		date: new Date(),
		id: id,
	}

	const opts = { runValidators: true, new: true,context: 'query'  }
	Person.findByIdAndUpdate(id, person, opts)
		.then(updatedNote => {
			response.json(updatedNote)
		})
		.catch(error => next(error))
})

//////////////////
const errorHandler = (error, request, response, next) => {
	console.log('error!!')
	console.error(error.message)

	if(error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}
	else if(error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`)
})
