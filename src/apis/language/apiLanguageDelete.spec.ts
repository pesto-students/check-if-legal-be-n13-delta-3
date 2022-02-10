import { Language } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listLanguage } from "../../services/language/listLanguage"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateAdmin } from "../../test/resources/admin"
import { generateLanguage } from "../../test/resources/language"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.DELETE
function getEndpoint(languageId: number | string) {
	return `/language/${languageId}`
}

describe(`API: ${method} ${getEndpoint(":id")}`, () => {
	let auth: string
	let languages: Language[]

	before(async () => {
		await truncateDatabase()
		const admin = await generateAdmin()
		auth = createAuthToken({ id: admin.id, role: AuthRole.ADMIN })

		languages = [
			await generateLanguage(),
			await generateLanguage(),
			await generateLanguage(),
		]
	})

	/**
	 * Authentication
	 */
	it(`Authentication: Fail without token`, async () => {
		await httpApiRequest({
			method,
			endpoint: getEndpoint(languages[0].id),
			expectedStatusCode: HttpStatusCode.FORBIDDEN,
		})
	})

	/**
	 * Success Cases
	 */
	it(`Success`, async () => {
		let countLanguages = languages.length
		for (const language of languages) {
			const res = await httpApiRequest({
				method,
				endpoint: getEndpoint(language.id),
				auth,
				expectedStatusCode: HttpStatusCode.NO_CONTENT,
			})
			expect(res).empty

			const [[deletedLanguage], languageList] = await Promise.all([
				listLanguage({ filter: { id: language.id } }),
				listLanguage(),
			])
			expect(deletedLanguage).not.exist
			expect(languageList).length(--countLanguages)
		}
	})

	/**
	 * Fail Cases
	 */
	it(`Fail: deleting invalid language`, async () => {
		await httpApiRequest({
			method,
			endpoint: getEndpoint(languages[0].id),
			auth,
			expectedStatusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
		})
	})
})
