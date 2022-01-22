import { City, PrismaClient } from "@prisma/client"

export async function listCity({
	filter,
	include,
}: {
	filter?: { id?: number; stateId?: number }
	include?: { state?: boolean }
} = {}): Promise<City[]> {
	const prisma = new PrismaClient()
	return await prisma.city.findMany({
		orderBy: { name: "asc" },
		where: filter,
		include,
	})
}
