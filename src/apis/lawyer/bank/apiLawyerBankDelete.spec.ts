import { Lawyer, LawyerBank } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../../core/http"
import { createAuthToken } from "../../../helpers/auth/authToken"
import { listLawyerBank } from "../../../services/lawyerBank/listLawyerBank"
import { httpApiRequest } from "../../../test/httpApiRequest"
import { generateLawyer } from "../../../test/resources/lawyer"
import { generateLawyerBank } from "../../../test/resources/lawyerBank"
import { truncateDatabase } from "../../../test/truncateDatabase"

const method = HttpMethod.DELETE
function getEndpoint(lawyerBankId: number | string) {
	return `/lawyer/bank/${lawyerBankId}`
}

describe(`API: ${method} ${getEndpoint(":id")}`, () => {
	let lawyer: Lawyer
	let auth: string
	let lawyersBank: LawyerBank
	let othersBank: LawyerBank

	before(async () => {
		await truncateDatabase()
		lawyer = await generateLawyer({ isVerified: true })
		auth = createAuthToken({ id: lawyer.userId, role: AuthRole.LAWYER })

		lawyersBank = await generateLawyerBank({ lawyerId: lawyer.id })
		othersBank = await generateLawyerBank()
	})

	it(`Fail: deleting other lawyers bank`, async () => {
		await httpApiRequest({
			method,
			endpoint: getEndpoint(othersBank.id),
			auth,
			expectedStatusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
		})

		const [lawyerBank] = await listLawyerBank({ filter: { id: othersBank.id } })
		expect(lawyerBank).exist
	})

	it(`Success`, async () => {
		const res = await httpApiRequest({
			method,
			endpoint: getEndpoint(lawyersBank.id),
			auth,
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})
		expect(res).empty

		const [lawyerBank] = await listLawyerBank({ filter: { id: lawyersBank.id } })
		expect(lawyerBank).not.exist
	})
})
