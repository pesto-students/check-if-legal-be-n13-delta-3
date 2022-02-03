import { randCity } from "@ngneat/falso"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listCity } from "../../services/city/listCity"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateAdmin } from "../../test/resources/admin"
import { generateCity } from "../../test/resources/city"
import { generateState } from "../../test/resources/state"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.PATCH
function getEndpoint(cityId: number | string) {
	return `/city/${cityId}`
}

describe(`API: ${getEndpoint(":id")}`, () => {
	let auth: string
	let cityId: number
	let stateId: number

	before(async () => {
		await truncateDatabase()
		const admin = await generateAdmin()
		auth = createAuthToken({ id: admin.id, role: AuthRole.ADMIN })

		stateId = (await generateState()).id
		cityId = (await generateCity({ stateId })).id
	})

	/**
	 * Authentication
	 */
	it(`Authentication: Fail without token`, async () => {
		const name = randCity()

		await httpApiRequest({
			method,
			endpoint: getEndpoint(cityId),
			expectedStatusCode: HttpStatusCode.FORBIDDEN,
			body: { name },
		})
	})

	/**
	 * Success Cases
	 */
	it(`Success`, async () => {
		const name = randCity()

		const res = await httpApiRequest({
			method,
			endpoint: getEndpoint(cityId),
			auth,
			body: { name },
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})
		expect(res).empty

		const [city] = await listCity({ filter: { id: cityId } })
		expect(city).exist
		expect(city.id).equal(cityId)
		expect(city.name).equal(name)
	})

	/**
	 * Fail Cases
	 */
	it(`Fail: updating already exist city name in same state`, async () => {
		const city2 = await generateCity({ stateId })

		await httpApiRequest({
			method,
			endpoint: getEndpoint(cityId),
			auth,
			body: { name: city2.name },
			expectedStatusCode: HttpStatusCode.CONFLICT,
		})
	})
})
