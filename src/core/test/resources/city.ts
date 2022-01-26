import { randCity } from "@ngneat/falso"
import { createCity } from "../../../services/city/createCity"
import { generateState } from "./state"

export async function generateCity({ stateId }: { stateId?: number } = {}) {
	if (!stateId) stateId = (await generateState()).id
	const name = randCity()
	return await createCity({ stateId, name })
}
