function isValidBookPart(maybeBook) {
	// Validering: kontrollera att datan är i rätt format
	// title måste vara en icke-tom sträng
	if (!isNonEmptyString(maybeBook.title)) {
		console.log('isValidBook: felaktig titel', maybeBook.title)
		return false
	}

	// authorName måste vara en sträng med minst ett namn, minst 1 bokstav
	if (!isNonEmptyString(maybeBook.authorName)) {
		console.log('isValidBook: felaktigt författarnamn')
		return false
	}

	return true
}

function isValidBook(maybeBook) {
	const validPart = isValidBookPart(maybeBook)
	if( !validPart ) {
		return false
	}

	// id måste vara ett number, positivt heltal
	// man hade kunnat använda crypto.randomUUID() för att få en unik sträng i stället
	if (!isPositiveInteger(maybeBook.id)) {
		console.log('isValidBook: felaktigt id')
		return false
	}

	return true
}

function isPositiveInteger(x) {
	const isNumber = typeof x === 'number'
	const isInteger = x % 1 === 0
	return isNumber && x > 0 && isInteger
}

function isNonEmptyString(x) {
	return typeof x === 'string' && x.length > 0
}

export { isValidBook, isValidBookPart, isPositiveInteger }
