import { randState } from "@ngneat/falso"
import { checkStateNameAvailability } from "../../services/state/checkStateNameAvailability"
import { createState } from "../../services/state/createState"

export async function generateState() {
	const name = await getAvailableStateName()
	return await createState({ name })
}

export async function getAvailableStateName() {
	let name = randState()
	do {
		try {
			await checkStateNameAvailability(name)
			return name
		} catch (err) {
			if (err instanceof Error && err.name == "ConflictError") {
				name = randState()
				continue
			}
			throw err
		}
	} while (true)
}
