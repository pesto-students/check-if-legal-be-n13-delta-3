import { State } from "@prisma/client"
import { expect } from "chai"
import { HttpMethod } from "../../core/http"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateState } from "../../test/resources/state"
import { expectStateSchema } from "../../test/schemas/state"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.GET
const endpoint = "/state"

describe(`API: ${method} ${endpoint}`, () => {
	let states: State[]

	before(async () => {
		await truncateDatabase()
		states = [await generateState(), await generateState(), await generateState()]
	})

	it(`Success`, async () => {
		const res = await httpApiRequest({ method, endpoint })
		expect(res).exist

		for (const el of res) expectStateSchema(el)
		expect(res).length(states.length)
	})
})
