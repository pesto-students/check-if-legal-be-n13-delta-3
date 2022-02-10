import { randState } from "@ngneat/falso"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listState } from "../../services/state/listState"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateAdmin } from "../../test/resources/admin"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.POST
const endpoint = "/state"

describe(`API: ${endpoint}`, () => {
	let auth: string
	let name: string

	before(async () => {
		await truncateDatabase()
		const admin = await generateAdmin()
		auth = createAuthToken({ id: admin.id, role: AuthRole.ADMIN })

		name = randState()
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

		const [state] = await listState({ filter: { id: res.id } })
		expect(state).exist
		expect(state.id).equal(res.id)
		expect(state.name).equal(name)
	})

	/**
	 * Fail Cases
	 */
	it(`Fail: with already exists state name`, async () => {
		await httpApiRequest({
			method,
			endpoint,
			auth,
			body: { name },
			expectedStatusCode: HttpStatusCode.CONFLICT,
		})
	})
})
