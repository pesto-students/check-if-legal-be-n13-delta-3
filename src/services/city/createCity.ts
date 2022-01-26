import { City, PrismaClient } from "@prisma/client"
import { UnprocessableEntityError } from "../../core/http"
import { checkCityNameAvailability } from "./checkCityNameAvailability"

export async function createCity({
	stateId,
	name,
}: {
	stateId: number
	name: string
}): Promise<City> {
	const prisma = new PrismaClient()

	await checkCityNameAvailability({ stateId, name })
	const state = await prisma.state.findFirst({ where: { id: stateId } })
	if (!state) throw new UnprocessableEntityError("Invalid state")

	return await prisma.city.create({ data: { stateId, name } })
}
