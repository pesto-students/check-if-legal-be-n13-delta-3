import { UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"
import { listCity } from "../city/listCity"

export async function deleteState(filter: { id: number }): Promise<void> {
	const state = await prisma.state.findFirst({ where: filter })
	if (!state) throw new UnprocessableEntityError("Invalid state")

	const stateCityList = await listCity({ filter: { stateId: filter.id } })
	if (stateCityList.length > 0) {
		throw new UnprocessableEntityError("Cannot delete state with cities")
	}

	await prisma.state.delete({ where: filter })
}
