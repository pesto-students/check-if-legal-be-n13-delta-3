import { Lawyer, LawyerBank } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../../core/enums"
import { HttpMethod } from "../../../core/http"
import { createAuthToken } from "../../../helpers/auth/authToken"
import { httpApiRequest } from "../../../test/httpApiRequest"
import { generateLawyer } from "../../../test/resources/lawyer"
import { generateLawyerBank } from "../../../test/resources/lawyerBank"
import { expectLawyerBankSchema } from "../../../test/schemas/lawyerBank"
import { truncateDatabase } from "../../../test/truncateDatabase"

const method = HttpMethod.GET
const endpoint = "/lawyer/bank"

describe(`API: ${method} ${endpoint}`, () => {
	let auth: string
	let lawyer: Lawyer
	let lawyerBanks: LawyerBank[]

	before(async () => {
		await truncateDatabase()
		lawyer = await generateLawyer({ isVerified: true })
		auth = createAuthToken({ id: lawyer.userId, role: AuthRole.LAWYER })

		lawyerBanks = [
			await generateLawyerBank(),
			await generateLawyerBank({ lawyerId: lawyer.id }),
			await generateLawyerBank({ lawyerId: lawyer.id }),
			await generateLawyerBank(),
		]
	})

	it("Success", async () => {
		const res = await httpApiRequest({ method, endpoint, auth })
		expect(res).exist
		for (const el of res) expectLawyerBankSchema(el)

		let expectedList = lawyerBanks.filter((el) => el.lawyerId === lawyer.id)
		expect(res.length).equal(expectedList.length)
	})
})
