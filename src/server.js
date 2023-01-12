// Imports
import express from 'express'
import * as url from 'url';
import { isValidBook, isPositiveInteger, isNonEmptyString } from './validate.js'

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
app.get('/', (req, res) => {
	let path = staticPath + '/index.html'
	// console.log('GET /  path=', path)
	res.sendFile(path)
})

const bookData = [
	{ title: 'Pippi Långstrump', authorName: 'Astrid Lindgren', id: 1 },
	{ title: 'Mio min Mio', authorName: 'Astrid Lindgren', id: 2 },
	{ title: 'Bröderna Lejonhjärta', authorName: 'Astrid Lindgren', id: 3 }
]
app.get('/api/books', (req, res) => {
	res.status(200).send(bookData)
})
app.get('/api/books/:id', (req, res) => {
	console.log('/api/books/:id')
	const id = req.params.id
	
	let maybeBook = bookData.find(book => book.id === Number(id))
	if( maybeBook ) {
		res.send(maybeBook)
	} else {
		res.sendStatus(404)
	}
})



app.post('/api/books/', (req, res) => {
	const newBook = req.body
	
	if( !isValidBook(newBook) ) {
		console.log('POST /api/books  Not a valid book')
		res.sendStatus(400)
		return
	}
	
	// Kontrollera att id inte redan finns
	// Möjliga sätt att loopa bookData: for-loop, forEach, while, find
	let withSameId = bookData.find(book => book.id === newBook.id)
	if( withSameId !== undefined ) {
		console.log('POST /api/books  Duplicate id')
		res.sendStatus(400)
		return
	}

	// (Eller låt servern bestämma id)
	bookData.push(newBook)
	res.sendStatus(200)
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
