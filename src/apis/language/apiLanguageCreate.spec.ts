import { randLanguage } from "@ngneat/falso"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listLanguage } from "../../services/language/listLanguage"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateAdmin } from "../../test/resources/admin"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.POST
const endpoint = "/language"

describe(`API: ${method} ${endpoint}`, () => {
	let auth: string
	let name: string

	before(async () => {
		await truncateDatabase()
		const admin = await generateAdmin()
		auth = createAuthToken({ id: admin.id, role: AuthRole.ADMIN })
		name = randLanguage()
	})

	/**
	 * Authentication
	 */
	it(`Authentication: Fail without token`, async () => {
		await httpApiRequest({
			method,
			endpoint,
			body: { name },
			expectedStatusCode: HttpStatusCode.FORBIDDEN,
		})
	})

	/**
	 * Success Cases
	 */
	it(`Success`, async () => {
		const res = await httpApiRequest({
			method,
			endpoint,
			auth,
			body: { name },
			expectedStatusCode: HttpStatusCode.CREATED,
		})
		expect(res).exist
		expect(res.id).exist

		const [language] = await listLanguage({ filter: { id: res.id } })
		expect(language).exist
		expect(language.id).equal(res.id)
		expect(language.name).equal(name)
	})

	/**
	 * Fail Cases
	 */
	it(`Fail: with already exists language name`, async () => {
		await httpApiRequest({
			method,
			endpoint,
			auth,
			body: { name },
			expectedStatusCode: HttpStatusCode.CONFLICT,
		})
	})
})
