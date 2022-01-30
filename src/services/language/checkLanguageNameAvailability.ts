import { ConflictError } from "../../core/http"
import { prisma } from "../../core/prisma"

export async function checkLanguageNameAvailability(name: string) {
	const language = await prisma.language.findFirst({
		where: { name: { equals: name.toLowerCase(), mode: "insensitive" } },
	})
	if (!language) return
	throw new ConflictError(`Language with name ${name} already exists`)
}
