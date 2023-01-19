const btnGetBooks = document.querySelector('#btnGetBooks')
const btnPostBook = document.querySelector('#btnPostBook')
const booksList = document.querySelector('#booksList')


async function getBooks() {
	// 1. skicka ett request till backend: GET /api/books
	// 2. backend skickar tillbaka lista med böcker (förhoppningsvis)
	// 3. spara datan i en variabel
	// 4. rendera DOM-element som visar datan == skapa DOM-element som innehåller titel och författare som text

	// Skicka request med AJAX. Ett enkelt GET-request behöver inga inställningar
	let bookData = null
	try {
		const response = await fetch('/api/books')
		if( response.status !== 200 ) {
			console.log('Could not contact server. Status: ' + response.status)
			return
		}
		bookData = await response.json()
		console.log('Data from server: ', bookData)

	} catch(error) {
		console.log('Something went wrong when fetching data from server. (GET) \n' + error.message)
		return
	}

	booksList.innerHTML = ''

	bookData.forEach(book => {
		// Bok-objekt har egenskaperna: title, authorName, id
		// skapa ett <li> element
		// fyll elementet med bokdata (titel osv.)
		// lägg till sist i <ul>

		let li = document.createElement('li')
		li.innerText = `${book.title} by ${book.authorName}.`
		booksList.appendChild(li)
	})
}
btnGetBooks.addEventListener('click', getBooks)


btnPostBook.addEventListener('click', async () => {
	// 1. skicka ett POST /api/books request med data i request body
	// 2. Vad skickar servern för svar?
	// 3. uppdatera gränssnittet

	const newBook = {
		title: 'Liftarens guide till galaxen',
		authorName: 'Douglas Adams',
		id: 42
	}
	
	const options = {
		method: 'POST',
		body: JSON.stringify(newBook),
		headers: {
			'Content-Type': 'application/json'
		}
	}
	// TODO: lägg till try/catch eftersom fetch är en osäker operation
	const response = await fetch('/api/books', options)

	if( response.status === 200 ) {
		// Allt gick bra
		// Skicka ett nytt GET request och uppdatera gränssnittet
		getBooks()

	} else {
		// Något gick fel
		console.log('Något gick fel vid POST request! status=', response.status)
	}
})