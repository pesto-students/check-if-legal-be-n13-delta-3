import { Lawyer, Offering } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateLawyer } from "../../test/resources/lawyer"
import { generateOffering } from "../../test/resources/offering"
import { expectOfferingSchema } from "../../test/schemas/offering"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.GET
const endpoint = "/offering"

describe(`API: ${endpoint}`, () => {
	let lawyer: Lawyer
	let auth: string
	let offerings: Offering[]

	before(async () => {
		await truncateDatabase()
		lawyer = await generateLawyer({ isVerified: true })
		auth = createAuthToken({ id: lawyer.userId, role: AuthRole.LAWYER })

		offerings = [
			await generateOffering({ lawyerId: lawyer.id }),
			await generateOffering({ lawyerId: lawyer.id }),
			await generateOffering({ lawyerId: lawyer.id }),
			await generateOffering({}),
		]
	})

	it(`Success`, async () => {
		const res = await httpApiRequest({ method, endpoint, auth })
		expect(res).exist

		let expectedList = offerings.filter((el) => el.lawyerId === lawyer.id)
		expect(res.length).equal(expectedList.length)

		for (const el of res) expectOfferingSchema(el)
	})
})
