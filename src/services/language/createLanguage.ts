import { Language, PrismaClient } from "@prisma/client"
import { checkLanguageNameAvailability } from "./checkLanguageNameAvailability"

export async function createLanguage({ name }: { name: string }): Promise<Language> {
	const prisma = new PrismaClient()
	await checkLanguageNameAvailability(name)
	return await prisma.language.create({ data: { name } })
}
