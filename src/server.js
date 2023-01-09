import express from 'express'

const app = express()


// Routes
app.get('/', (req, res) => {
	console.log('GET /')
	res.send('Hello there')
})


export { app }
