import { City } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function listCity({
	filter,
	include,
}: {
	filter?: { id?: number; stateId?: number }
	include?: { state?: boolean }
} = {}): Promise<City[]> {
	return await prisma.city.findMany({
		orderBy: { name: "asc" },
		where: filter,
		include,
	})
}
