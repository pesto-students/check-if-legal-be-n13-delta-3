import { State } from "@prisma/client"
import { prisma } from "../../core/prisma"
import { checkStateNameAvailability } from "./checkStateNameAvailability"
import { listState } from "./listState"

export async function updateState({
	filter,
	update,
}: {
	filter: { id: number }
	update: { name?: string }
}): Promise<State> {
	const [state] = await listState({ filter })
	if (!state) throw new Error("Invalid state")

	if (update.name) {
		await checkStateNameAvailability(update.name)
	}
	return await prisma.state.update({ where: filter, data: update })
}
