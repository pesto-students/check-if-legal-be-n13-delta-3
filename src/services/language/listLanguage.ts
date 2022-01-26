import { Language, PrismaClient } from "@prisma/client"

export async function listLanguage({
	filter,
}: { filter?: { id?: number } } = {}): Promise<Language[]> {
	const prisma = new PrismaClient()
	return await prisma.language.findMany({ orderBy: { name: "asc" }, where: filter })
}
