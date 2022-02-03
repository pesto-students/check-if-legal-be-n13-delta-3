import { UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"

export async function deleteLanguage(filter: { id: number }): Promise<void> {
	const language = await prisma.language.findFirst({ where: filter })
	if (!language) throw new UnprocessableEntityError("Invalid language")

	await prisma.language.delete({ where: filter })
}
