import { Lawyer } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../../core/http"
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

	before(async () => {
		await truncateDatabase()
		lawyer = await generateLawyer({ isVerified: true })
		auth = createAuthToken({ id: lawyer.userId, role: AuthRole.LAWYER })
	})

	it("Success: with no bank", async () => {
		const res = await httpApiRequest({
			method,
			endpoint,
			auth,
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})
		expect(res).empty
	})

	it("Success: with bank", async () => {
		await generateLawyerBank({ lawyerId: lawyer.id })

		const res = await httpApiRequest({ method, endpoint, auth })
		expect(res).exist
		expectLawyerBankSchema(res)
	})
})
