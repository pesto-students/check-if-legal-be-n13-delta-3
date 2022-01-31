import { Lawyer } from "@prisma/client"
import { expect } from "chai"
import { existsSync } from "fs"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { getLawyerProofDirPath } from "../../helpers/directoryPaths"
import { listLawyer } from "../../services/lawyer/listLawyer"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateAdmin } from "../../test/resources/admin"
import { generateLawyer } from "../../test/resources/lawyer"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.POST
function getEndpoint(lawyerId: number | string) {
	return `/lawyer/${lawyerId}/verify`
}

describe(`API: ${getEndpoint(":lawyerId")}`, () => {
	let auth: string
	let lawyer: Lawyer

	before(async () => {
		await truncateDatabase()
		lawyer = await generateLawyer()

		const admin = await generateAdmin()
		auth = createAuthToken({ id: admin.id, role: AuthRole.ADMIN })
	})

	/**
	 * Authentication
	 */
	it(`Authentication: Fail without token`, async () => {
		await httpApiRequest({
			method,
			endpoint: getEndpoint(lawyer.id),
			expectedStatusCode: HttpStatusCode.FORBIDDEN,
		})
	})

	/**
	 * Success
	 */
	it("Success", async () => {
		const res = await httpApiRequest({
			method,
			endpoint: getEndpoint(lawyer.id),
			auth,
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})
		expect(res).empty

		const lawyerList = await listLawyer({ filter: { id: lawyer.id } })
		expect(lawyerList).length(1)
		expect(lawyerList[0].id).equal(lawyer.id)
		expect(lawyerList[0].isVerified).true

		const lawyerProofDir = getLawyerProofDirPath(lawyer.id)
		const isDirExist = existsSync(lawyerProofDir)
		expect(isDirExist).false
	})
})
