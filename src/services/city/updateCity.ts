import { City } from "@prisma/client"
import { prisma } from "../../core/prisma"
import { checkCityNameAvailability } from "./checkCityNameAvailability"

export async function updateCity({
	filter,
	update,
}: {
	filter: { id: number }
	update: { name?: string; stateId?: number }
}): Promise<City> {
	const city = await prisma.city.findFirst({
		where: filter,
		include: { state: true },
	})
	if (!city) throw new Error("Invalid city")

	await checkCityNameAvailability({
		name: update.name ?? city.name,
		stateId: update.stateId ?? city.stateId,
	})
	return await prisma.city.update({ where: filter, data: update })
}
