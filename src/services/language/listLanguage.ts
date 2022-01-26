import { Language } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function listLanguage({
	filter,
}: { filter?: { id?: number } } = {}): Promise<Language[]> {
	return await prisma.language.findMany({ orderBy: { name: "asc" }, where: filter })
}
