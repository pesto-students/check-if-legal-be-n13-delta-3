import { PaperType } from "@prisma/client"
import { expect } from "chai"
import { HttpMethod } from "../../core/http"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generatePaperType } from "../../test/resources/paperType"
import { expectPaperTypeSchema } from "../../test/schemas/paperType"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.GET
const endpoint = "/paperType"

describe(`API: ${method} ${endpoint}`, () => {
	let paperTypes: PaperType[]

	before(async () => {
		await truncateDatabase()
		paperTypes = [
			await generatePaperType(),
			await generatePaperType(),
			await generatePaperType(),
		]
	})

	it(`Success`, async () => {
		const res = await httpApiRequest({ method, endpoint })
		expect(res).exist

		for (const el of res) expectPaperTypeSchema(el)
		expect(res).length(paperTypes.length)
	})
})
