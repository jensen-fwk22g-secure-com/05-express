import express from 'express'
import { isValidBook, isValidBookPart, isPositiveInteger } from '../validate.js'


const router = express.Router()


const bookData = [
	{ title: 'Pippi Långstrump', authorName: 'Astrid Lindgren', id: 1 },
	{ title: 'Mio min Mio', authorName: 'Astrid Lindgren', id: 2 },
	{ title: 'Bröderna Lejonhjärta', authorName: 'Astrid Lindgren', id: 3 }
]

router.get('/', (req, res) => {
	res.status(200).send(bookData)
})
router.get('/:id', (req, res) => {
	console.log('/api/books/:id')
	const id = req.params.id

	let maybeBook = bookData.find(book => book.id === Number(id))
	if (maybeBook) {
		res.send(maybeBook)
	} else {
		res.sendStatus(404)
	}
})



router.post('/', (req, res) => {
	// req.body är null om vi inte har express.json middleware
	const newBook = req.body

	if (!isValidBook(newBook)) {
		console.log('POST /api/books  Not a valid book')
		res.sendStatus(400)
		return
	}

	// Kontrollera att id inte redan finns
	// Möjliga sätt att loopa bookData: for-loop, forEach, while, find
	let withSameId = bookData.find(book => book.id === newBook.id)
	if (withSameId !== undefined) {
		console.log('POST /api/books  Duplicate id')
		res.sendStatus(400)
		return
	}

	// (Eller låt servern bestämma id)
	bookData.push(newBook)
	res.sendStatus(200)
})

router.delete('/', (req, res) => {
	console.log('DELETE /  Id required')
	res.sendStatus(400)
})
router.delete('/:id', (req, res) => {
	// är id valid?
	// finns det det en bok med detta id?
	// ta bort boken

	// id kommer från webbläsaren - det är en STRING
	const id = Number(req.params.id)
	console.log('DELETE /:id', req.params.id, id)
	if( !isPositiveInteger(id) ) {
		res.sendStatus(400)
		return
	}

	const maybeBookIndex = bookData.findIndex(book => book.id === id)
	if (maybeBookIndex === -1 ) {
		res.sendStatus(404)
		return
	}

	bookData.splice(maybeBookIndex, 1)
	res.sendStatus(200)
})

router.put('/', (req, res) => {
	console.log('PUT /  Bad request, no id')
	res.sendStatus(400)
})
router.put('/:id', (req, res) => {
	// kontrollera att id är korrekt
	// finns bok med id?
	// är req.body korrekt?
	// uppdatera (byt ut) objekt i "databasen"

	const id = Number(req.params.id)
	// console.log('PUT /:id', req.params.id, id)
	if (!isPositiveInteger(id)) {
		console.log('PUT /:id  Bad request, invalid id')
		res.sendStatus(400)
		return
	}

	const maybeBookIndex = bookData.findIndex(book => book.id === id)
	if (maybeBookIndex === -1) {
		res.sendStatus(404)
		return
	}

	const changes = req.body
	if( !isValidBookPart(changes) ) {
		console.log('PUT /:id  Bad request, invalid body')
		res.sendStatus(400)
		return
	}

	changes.id = id
	bookData[maybeBookIndex] = changes
	res.sendStatus(200)
})


export default router
