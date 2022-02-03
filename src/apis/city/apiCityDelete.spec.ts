import { City } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listCity } from "../../services/city/listCity"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateAdmin } from "../../test/resources/admin"
import { generateCity } from "../../test/resources/city"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.DELETE
function getEndpoint(cityId: number | string) {
	return `/city/${cityId}`
}

describe(`API: ${getEndpoint(":id")}`, () => {
	let auth: string
	let cities: City[]

	before(async () => {
		await truncateDatabase()
		const admin = await generateAdmin()
		auth = createAuthToken({ id: admin.id, role: AuthRole.ADMIN })

		cities = [await generateCity(), await generateCity(), await generateCity()]
	})

	/**
	 * Authentication
	 */
	it(`Authentication: Fail without token`, async () => {
		await httpApiRequest({
			method,
			endpoint: getEndpoint(cities[0].id),
			expectedStatusCode: HttpStatusCode.FORBIDDEN,
		})
	})

	/**
	 * Success Cases
	 */
	it(`Success`, async () => {
		let countCities = cities.length
		for (const city of cities) {
			const res = await httpApiRequest({
				method,
				endpoint: getEndpoint(city.id),
				auth,
				expectedStatusCode: HttpStatusCode.NO_CONTENT,
			})
			expect(res).empty

			const [[deletedCity], cityList] = await Promise.all([
				listCity({ filter: { id: city.id } }),
				listCity(),
			])
			expect(deletedCity).not.exist
			expect(cityList).length(--countCities)
		}
	})

	/**
	 * Fail Cases
	 */
	it(`Fail: deleting invalid city`, async () => {
		await httpApiRequest({
			method,
			endpoint: getEndpoint(cities[0].id),
			auth,
			expectedStatusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
		})
	})
})
