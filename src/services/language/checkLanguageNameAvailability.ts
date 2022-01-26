import { prisma } from "../../core/prisma"
import { UnprocessableEntityError } from "../../core/http"

export async function checkLanguageNameAvailability(name: string) {
	const language = await prisma.language.findFirst({
		where: { name: { equals: name.toLowerCase(), mode: "insensitive" } },
	})
	if (!language) return
	throw new UnprocessableEntityError(`Language with name ${name} already exists`)
}
