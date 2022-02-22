import { Lawyer } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../../core/http"
import { createAuthToken } from "../../../helpers/auth/authToken"
import { getLawyerBank } from "../../../services/lawyerBank/getLawyerBank"
import { httpApiRequest } from "../../../test/httpApiRequest"
import { generateLawyer } from "../../../test/resources/lawyer"
import { generateLawyerBank } from "../../../test/resources/lawyerBank"
import { truncateDatabase } from "../../../test/truncateDatabase"

const method = HttpMethod.DELETE
const endpoint = `/lawyer/bank`

describe(`API: ${method} ${endpoint}`, () => {
	let lawyer: Lawyer
	let auth: string

	before(async () => {
		await truncateDatabase()
		lawyer = await generateLawyer({ isVerified: true })
		auth = createAuthToken({ id: lawyer.userId, role: AuthRole.LAWYER })
	})

	it(`Success`, async () => {
		await generateLawyerBank({ lawyerId: lawyer.id })

		const res = await httpApiRequest({
			method,
			endpoint,
			auth,
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})
		expect(res).empty

		const lawyerBank = await getLawyerBank({ lawyerId: lawyer.id })
		expect(lawyerBank).not.exist
	})
})
