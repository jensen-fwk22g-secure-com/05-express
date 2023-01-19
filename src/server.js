// Imports
import express from 'express'
import * as url from 'url';
import booksRoute from './routes/books.js'
import { authenticateUser, createToken } from './auth.js'


// Konfiguration
const app = express()
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const staticPath = url.fileURLToPath(new URL('../static', import.meta.url))
const publicPath = url.fileURLToPath(new URL('../public', import.meta.url))


// Middleware
const logger = (req, res, next) => {
	console.log(`${req.method}  ${req.url}`, req.body)
	next()
}
app.use( express.json() )
app.use( logger )
app.use( express.static(staticPath) )
app.use( express.static(publicPath) )

/*const authExempel = (req, res, next) => {
	let path = req.url
	if( path.startsWith('/secret') ) {
		res.sendStatus(403)  // forbidden
	} else {
		next()  // lämna över till nästa
	}
}*/


// Routes
app.use( '/api/books', booksRoute )


app.post('/login', (req, res) => {
	const { name, password } = req.body

	// Finns användaren i databasen?
	if (authenticateUser(name, password)) {
		const userToken = createToken(name)
		res.status(200).send(userToken)

	} else {
		res.sendStatus(401)  // Unauthorized
		return
	}
})




/*
Higher order functions:
filter - ny lista med alla objekt som matchar ett villkor
find   - första objektet som matchar ett villkor
map
forEach
*/

app.get('/hello', (req, res) => {
	console.log('GET /')
	res.send('Hello there')
})

app.get('/double-send', (req, res) => {
	console.log('GET /double-send')
	res.send('double')
	res.send('double')
})
app.get('/no-send', (req, res) => {
	console.log('GET /no-send')
})

export { app }
