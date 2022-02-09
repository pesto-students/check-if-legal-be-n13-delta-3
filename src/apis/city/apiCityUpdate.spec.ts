import { randCity } from "@ngneat/falso"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listCity } from "../../services/city/listCity"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateAdmin } from "../../test/resources/admin"
import { generateCity, getAvailableCityName } from "../../test/resources/city"
import { generateState } from "../../test/resources/state"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.PATCH
function getEndpoint(cityId: number | string) {
	return `/city/${cityId}`
}

describe(`API: ${method} ${getEndpoint(":id")}`, () => {
	let auth: string

	before(async () => {
		await truncateDatabase()
		const admin = await generateAdmin()
		auth = createAuthToken({ id: admin.id, role: AuthRole.ADMIN })
	})

	/**
	 * Authentication
	 */
	it(`Authentication: Fail without token`, async () => {
		const name = randCity()
		const cityId = (await generateCity()).id

		await httpApiRequest({
			method,
			endpoint: getEndpoint(cityId),
			expectedStatusCode: HttpStatusCode.FORBIDDEN,
			body: { name },
		})
	})

	const possibilities: [string, { name?: boolean; stateId?: boolean }][] = [
		["update name", { name: true }],
		["update stateId", { stateId: true }],
	]

	/**
	 * Success Cases
	 */
	for (const [desc, toUpdate] of possibilities) {
		it(`Success ${desc}`, async () => {
			const city = await generateCity()

			const stateId = toUpdate.stateId ? (await generateState()).id : undefined
			const name = toUpdate.name
				? await getAvailableCityName(stateId ?? city.stateId)
				: undefined

			const res = await httpApiRequest({
				method,
				endpoint: getEndpoint(city.id),
				auth,
				body: { name, stateId },
				expectedStatusCode: HttpStatusCode.NO_CONTENT,
			})
			expect(res).empty

			const cities = await listCity({ filter: { id: city.id } })
			expect(cities[0]).exist
			expect(cities[0].id).equal(city.id)
			expect(cities[0].name).equal(name ?? city.name)
			expect(cities[0].stateId).equal(stateId ?? city.stateId)
		})
	}

	/**
	 * Fail Cases
	 */
	it(`Fail: updating already exist city name in same state`, async () => {
		const city = await generateCity()
		const city2 = await generateCity({ stateId: city.stateId })

		await httpApiRequest({
			method,
			endpoint: getEndpoint(city.id),
			auth,
			body: { name: city2.name },
			expectedStatusCode: HttpStatusCode.CONFLICT,
		})
	})
})
