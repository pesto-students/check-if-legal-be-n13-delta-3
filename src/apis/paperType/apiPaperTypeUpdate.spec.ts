import { randLanguage } from "@ngneat/falso"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listLanguage } from "../../services/language/listLanguage"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateAdmin } from "../../test/resources/admin"
import { generateLanguage } from "../../test/resources/language"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.PATCH
function getEndpoint(languageId: number | string) {
	return `/language/${languageId}`
}

describe(`API: ${method} ${getEndpoint(":id")}`, () => {
	let auth: string
	let languageId: number

	before(async () => {
		await truncateDatabase()
		const admin = await generateAdmin()
		auth = createAuthToken({ id: admin.id, role: AuthRole.ADMIN })

		languageId = (await generateLanguage()).id
	})

	/**
	 * Authentication
	 */
	it(`Authentication: Fail without token`, async () => {
		const name = randLanguage()

		await httpApiRequest({
			method,
			endpoint: getEndpoint(languageId),
			expectedStatusCode: HttpStatusCode.FORBIDDEN,
			body: { name },
		})
	})

	/**
	 * Success Cases
	 */
	it(`Success`, async () => {
		const name = randLanguage()

		const res = await httpApiRequest({
			method,
			endpoint: getEndpoint(languageId),
			auth,
			body: { name },
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})
		expect(res).empty

		const [language] = await listLanguage({ filter: { id: languageId } })
		expect(language).exist
		expect(language.id).equal(languageId)
		expect(language.name).equal(name)
	})

	/**
	 * Fail Cases
	 */
	it(`Fail: updating already exist language name`, async () => {
		const language2 = await generateLanguage()

		await httpApiRequest({
			method,
			endpoint: getEndpoint(languageId),
			auth,
			body: { name: language2.name },
			expectedStatusCode: HttpStatusCode.CONFLICT,
		})
	})
})
