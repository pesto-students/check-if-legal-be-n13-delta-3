import { PrismaClient } from "@prisma/client"

export async function truncateDatabase() {
	const prisma = new PrismaClient()
	await prisma.admin.deleteMany()
	await prisma.googleOAuth.deleteMany()
	await prisma.offering.deleteMany()
	await prisma.lawyerBank.deleteMany()
	await prisma.lawyer.deleteMany()
	await prisma.user.deleteMany()
	await prisma.city.deleteMany()
	await prisma.state.deleteMany()
	await prisma.language.deleteMany()
	await prisma.paperType.deleteMany()
}
