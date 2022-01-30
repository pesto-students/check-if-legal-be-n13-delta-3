import { randCity } from "@ngneat/falso"
import { checkCityNameAvailability } from "../../services/city/checkCityNameAvailability"
import { createCity } from "../../services/city/createCity"
import { generateState } from "./state"

export async function generateCity({ stateId }: { stateId?: number } = {}) {
	if (!stateId) stateId = (await generateState()).id
	const name = await getAvailableCityName(stateId)
	return await createCity({ stateId, name })
}

export async function getAvailableCityName(stateId: number) {
	let name = randCity()
	do {
		try {
			await checkCityNameAvailability({ stateId, name })
			return name
		} catch (err) {
			if (err instanceof Error && err.name == "ConflictError") {
				name = randCity()
				continue
			}
			throw err
		}
	} while (true)
}
