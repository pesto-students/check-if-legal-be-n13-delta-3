import { City } from "@prisma/client"
import { prisma } from "../../core/prisma"
import { checkCityNameAvailability } from "./checkCityNameAvailability"

export async function updateCity({
	filter,
	update,
}: {
	filter: { id: number }
	update: { name?: string }
}): Promise<City> {
	const city = await prisma.city.findFirst({
		where: filter,
		include: { state: true },
	})
	if (!city) throw new Error("Invalid city")

	if (update.name) {
		await checkCityNameAvailability({ name: update.name, stateId: city.state.id })
	}
	return await prisma.city.update({ where: filter, data: update })
}
