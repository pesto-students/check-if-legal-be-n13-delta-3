import { PaperType, PrismaClient } from "@prisma/client"

export async function listPaperType({
	filter,
}: { filter?: { id?: number; isSuspended?: boolean } } = {}): Promise<PaperType[]> {
	const prisma = new PrismaClient()
	return await prisma.paperType.findMany({ orderBy: { name: "asc" }, where: filter })
}
