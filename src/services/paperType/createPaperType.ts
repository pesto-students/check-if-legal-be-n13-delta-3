import { PaperType, PrismaClient } from "@prisma/client"
import { checkPaperTypeNameAvailability } from "./checkPaperTypeNameAvailability"

export async function createPaperType({ name }: { name: string }): Promise<PaperType> {
	const prisma = new PrismaClient()
	await checkPaperTypeNameAvailability(name)
	return await prisma.paperType.create({ data: { name } })
}
