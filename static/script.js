const btnGetBooks = document.querySelector('#btnGetBooks')
const booksList = document.querySelector('#booksList')

btnGetBooks.addEventListener('click', async () => {
	// 1. skicka ett request till backend: GET /api/books
	// 2. backend skickar tillbaka lista med böcker (förhoppningsvis)
	// 3. spara datan i en variabel
	// 4. rendera DOM-element som visar datan == skapa DOM-element som innehåller titel och författare som text

	// Skicka request med AJAX. Ett enkelt GET-request behöver inga inställningar
	const response = await fetch('/api/books')
	const bookData = await response.json()
	console.log('Data from server: ', bookData)

	bookData.forEach(book => {
		// Bok-objekt har egenskaperna: title, authorName, id
		// skapa ett <li> element
		// fyll elementet med bokdata (titel osv.)
		// lägg till sist i <ul>

		let li = document.createElement('li')
		li.innerText = `${book.title} by ${book.authorName}.`
		booksList.appendChild(li)
	})
})