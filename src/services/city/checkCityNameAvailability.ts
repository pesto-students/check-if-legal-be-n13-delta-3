import { ConflictError } from "../../core/http"
import { prisma } from "../../core/prisma"

export async function checkCityNameAvailability({
	stateId,
	name,
}: {
	stateId: number
	name: string
}) {
	const city = await prisma.city.findFirst({
		where: { stateId, name: { equals: name.toLowerCase(), mode: "insensitive" } },
	})
	if (!city) return

	const state = await prisma.state.findFirst({ where: { id: stateId } })
	throw new ConflictError(
		`City with name ${name} already exists in state ${state?.name}`,
	)
}
