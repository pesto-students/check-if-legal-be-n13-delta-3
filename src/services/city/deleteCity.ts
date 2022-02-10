import { UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"
import { listCity } from "./listCity"

export async function deleteCity(filter: { id: number }): Promise<void> {
	const [city] = await listCity({ filter })
	if (!city) throw new UnprocessableEntityError("Invalid city")

	await prisma.city.delete({ where: filter })
}
