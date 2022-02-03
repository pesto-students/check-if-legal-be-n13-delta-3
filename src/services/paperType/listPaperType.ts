import { PaperType } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function listPaperType({
	filter,
}: { filter?: { id?: number; isSuspended?: boolean } } = {}): Promise<PaperType[]> {
	return await prisma.paperType.findMany({ orderBy: { name: "asc" }, where: filter })
}
