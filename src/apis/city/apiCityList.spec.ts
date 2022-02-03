import { City } from "@prisma/client"
import { expect } from "chai"
import { HttpMethod } from "../../core/http"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateCity } from "../../test/resources/city"
import { expectCitySchema } from "../../test/schemas/city"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.GET
const endpoint = "/city"

describe(`API: ${method} ${endpoint}`, () => {
	let cities: City[]

	before(async () => {
		await truncateDatabase()
		cities = [
			await generateCity(),
			await generateCity(),
			await generateCity(),
			await generateCity(),
		]
	})

	it(`Success`, async () => {
		const res = await httpApiRequest({ method, endpoint })
		expect(res).exist

		for (const el of res) expectCitySchema(el)
		expect(res).length(cities.length)
	})
})
