import axios from 'axios'
import names from '../../../data/names-none.json'

const main = async () => {
	const usables: string[] = []

	for (const name of names) {
		await axios
			.get(`https://twitter.com/${name}`)
			.then(() => {})
			.catch((_err) => usables.push(name))
	}
	console.log(JSON.stringify(usables))
}

main()
