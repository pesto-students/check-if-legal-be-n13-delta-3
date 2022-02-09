import { listState } from "../src/services/state/listState"
import { createCity } from "../src/services/city/createCity"

async function main() {
	const stateList = await listState()

	const delhiState = stateList.find((state) => state.name === "Delhi")
	const maharashtraState = stateList.find((state) => state.name === "Maharashtra")

	if (delhiState && maharashtraState) {
		await createCity({ name: "Delhi", stateId: delhiState.id })
		await createCity({ name: "Mumbai", stateId: maharashtraState.id })
	}
}

main()
