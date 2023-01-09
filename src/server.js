// Imports
import express from 'express'
import * as url from 'url';

// Konfiguration
const app = express()
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const staticPath = url.fileURLToPath(new URL('../static', import.meta.url))



// Routes
app.get('/', (req, res) => {
	let path = staticPath + '/index.html'
	console.log('GET /  path=', path)
	res.sendFile(path)
})

app.get('/api/books', (req, res) => {
	const bookData = [
		{ title: 'Pippi Långstrump', authorName: 'Astrid Lindgren', id: 1 },
		{ title: 'Mio min Mio', authorName: 'Astrid Lindgren', id: 2 },
		{ title: 'Bröderna Lejonhjärta', authorName: 'Astrid Lindgren', id: 3 }
	]
	res.send(bookData)
})

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
