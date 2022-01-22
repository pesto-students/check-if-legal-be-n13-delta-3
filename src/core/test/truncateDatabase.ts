import { PrismaClient } from "@prisma/client"

export async function truncateDatabase() {
	const prisma = new PrismaClient()
	prisma.admin.deleteMany({})
}
