import { randCity } from "@ngneat/falso"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listCity } from "../../services/city/listCity"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateAdmin } from "../../test/resources/admin"
import { generateState } from "../../test/resources/state"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.POST
const endpoint = "/city"

describe(`API: ${endpoint}`, () => {
	let auth: string
	let stateId: number
	let name: string

	before(async () => {
		await truncateDatabase()
		const admin = await generateAdmin()
		auth = createAuthToken({ id: admin.id, role: AuthRole.ADMIN })

		stateId = (await generateState()).id
		name = randCity()
	})

	/**
	 * Authentication
	 */
	it(`Authentication: Fail without token`, async () => {
		const expectedStatusCode = HttpStatusCode.FORBIDDEN
		await httpApiRequest({
			method,
			endpoint,
			expectedStatusCode,
			body: { name, stateId },
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
			body: { name, stateId },
			expectedStatusCode: HttpStatusCode.CREATED,
		})
		expect(res).exist
		expect(res.id).exist

		const [city] = await listCity({ filter: { id: res.id } })
		expect(city).exist
		expect(city.id).equal(res.id)
		expect(city.name).equal(name)
		expect(city.stateId).equal(stateId)
	})

	/**
	 * Fail Cases
	 */
	it(`Fail: with already exists city name in same state`, async () => {
		await httpApiRequest({
			method,
			endpoint,
			auth,
			body: { name, stateId },
			expectedStatusCode: HttpStatusCode.CONFLICT,
		})
	})
})
