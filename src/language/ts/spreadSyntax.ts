type AnimalsA = {
	cat: string
	dog: string
}

type AnimalsB = {
	cat: string
	dog: string
	bird: string
}

const _convertAB = (animals: AnimalsA): AnimalsB => {
	const res = {
		...animals,
		bird: '',
	}

	return res
}
