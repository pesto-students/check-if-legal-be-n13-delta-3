import { randLanguage } from "@ngneat/falso"
import { checkLanguageNameAvailability } from "../../services/language/checkLanguageNameAvailability"
import { createLanguage } from "../../services/language/createLanguage"

export async function generateLanguage() {
	const name = await getAvailableLanguageName()
	return await createLanguage({ name })
}

export async function getAvailableLanguageName() {
	let name = randLanguage()
	do {
		try {
			await checkLanguageNameAvailability(name)
			return name
		} catch (err) {
			if (err instanceof Error && err.name == "ConflictError") {
				name = randLanguage()
				continue
			}
			throw err
		}
	} while (true)
}
