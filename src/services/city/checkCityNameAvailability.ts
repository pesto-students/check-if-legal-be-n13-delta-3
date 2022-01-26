import { PrismaClient } from "@prisma/client"
import { UnprocessableEntityError } from "../../core/http"

export async function checkCityNameAvailability({
	stateId,
	name,
}: {
	stateId: number
	name: string
}) {
	const prisma = new PrismaClient()
	const city = await prisma.city.findFirst({
		where: { stateId, name: { equals: name.toLowerCase(), mode: "insensitive" } },
	})
	if (!city) return

	const state = await prisma.state.findFirst({ where: { id: stateId } })
	throw new UnprocessableEntityError(
		`City with name ${name} already exists in state ${state?.name}`,
	)
}
