import { Language } from "@prisma/client"
import { expect } from "chai"
import { HttpMethod } from "../../core/http"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateLanguage } from "../../test/resources/language"
import { expectLanguageSchema } from "../../test/schemas/language"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.GET
const endpoint = "/language"

describe(`API: ${method} ${endpoint}`, () => {
	let languages: Language[]

	before(async () => {
		await truncateDatabase()
		languages = [
			await generateLanguage(),
			await generateLanguage(),
			await generateLanguage(),
		]
	})

	it(`Success`, async () => {
		const res = await httpApiRequest({ method, endpoint })
		expect(res).exist

		for (const el of res) expectLanguageSchema(el)
		expect(res).length(languages.length)
	})
})
