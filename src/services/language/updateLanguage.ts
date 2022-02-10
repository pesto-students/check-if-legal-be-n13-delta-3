import { Language } from "@prisma/client"
import { prisma } from "../../core/prisma"
import { checkLanguageNameAvailability } from "./checkLanguageNameAvailability"
import { listLanguage } from "./listLanguage"

export async function updateLanguage({
	filter,
	update,
}: {
	filter: { id: number }
	update: { name?: string }
}): Promise<Language> {
	const [language] = await listLanguage({ filter })
	if (!language) throw new Error("Invalid language")

	if (update.name) {
		await checkLanguageNameAvailability(update.name)
	}
	return await prisma.language.update({ where: filter, data: update })
}
