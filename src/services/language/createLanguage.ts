import { Language } from "@prisma/client"
import { prisma } from "../../core/prisma"
import { checkLanguageNameAvailability } from "./checkLanguageNameAvailability"

export async function createLanguage({ name }: { name: string }): Promise<Language> {
	await checkLanguageNameAvailability(name)
	return await prisma.language.create({ data: { name } })
}
