import jwt from 'jsonwebtoken'

// Kod hämtad från JWT-exemplet
const fakeDb = [
	{ name: 'Lovisa', password: 'hej123' }
]


function authenticateUser(userName, password) {
	// Tips: Array.some
	const found = fakeDb.find(user => user.name === userName && user.password === password)

	return Boolean(found)
}

function createToken(name) {
	const user = { name: name }
	console.log('createToken: ', user, process.env.SECRET)
	const token = jwt.sign(user, process.env.SECRET, { expiresIn: '1h' })
	user.token = token
	console.log('createToken', user)
	return user
}

export { createToken, authenticateUser }
