const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>')
	process.exit(1)
}

const password = process.argv[2]


const url =
`mongodb+srv://fullstack:${password}@cluster0.p2oe2.mongodb.net/phonebook-app?retryWrites=true&w=majority`
//   `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`
//   mongo "mongodb+srv://cluster0.v7dxz.mongodb.net/<dbname>" --username fullstack
//   mongodb+srv://fullstack:{password}@cluster0.v7dxz.mongodb.net/test?retryWrites=true&w=majority

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
	date: Date
})

const Person = mongoose.model('Person',personSchema)

if (process.argv.length === 5) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
		date: new Date(),
	})

	// eslint-disable-next-line no-unused-vars
	person.save().then(result => {
		console.log('person entry saved!')
		mongoose.connection.close()
	})
}

else if(process.argv.length === 3){
	console.log('phonebook:')
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(`${person.name} ${person.number}`)
		})
		mongoose.connection.close()
	})
}

else {
	console.log('error')
	mongoose.connection.close()
}