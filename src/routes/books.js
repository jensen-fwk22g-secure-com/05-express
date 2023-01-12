import express from 'express'
import { isValidBook } from '../validate.js'


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

export default router
