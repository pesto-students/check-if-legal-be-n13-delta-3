import { createCity } from "../src/services/city/createCity"
import { listState } from "../src/services/state/listState"

export async function seedCities() {
	const stateList = await listState()
	const cityNames = [
		{ name: "Delhi", stateName: "Delhi" },
		{ name: "Mumbai", stateName: "Maharashtra" },
	]

	for (const { name, stateName } of cityNames) {
		const state = stateList.find((state) => state.name === stateName)
		if (!state) throw new Error(`${stateName} state not found`)
		await createCity({ name, stateId: state.id })
	}
}
