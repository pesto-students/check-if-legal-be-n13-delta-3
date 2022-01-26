import { PrismaClient } from "@prisma/client"

export async function truncateDatabase() {
	const prisma = new PrismaClient()
	await prisma.admin.deleteMany()
}
