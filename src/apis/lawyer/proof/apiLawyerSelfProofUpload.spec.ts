import { Lawyer } from "@prisma/client"
import { expect } from "chai"
import { readFileSync } from "fs"
import { AuthRole } from "../../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../../core/http"
import { createAuthToken } from "../../../helpers/auth/authToken"
import { getLawyerProofDirPath } from "../../../helpers/directoryPaths"
import { getDirFiles } from "../../../helpers/fs"
import { getTestAssetsPath } from "../../../test/helpers"
import { httpApiRequest } from "../../../test/httpApiRequest"
import { generateLawyer } from "../../../test/resources/lawyer"
import { generateUser } from "../../../test/resources/user"
import { truncateDatabase } from "../../../test/truncateDatabase"

const method = HttpMethod.POST
const endpoint = "/lawyer/self/proof"

describe(`API: ${method} ${endpoint}`, () => {
	let auth: string
	let lawyer: Lawyer

	before(async () => {
		await truncateDatabase()
		const user = await generateUser({ isLawyer: true })
		lawyer = await generateLawyer({ userId: user.id })
		auth = createAuthToken({ id: user.id, role: AuthRole.LAWYER })
	})

	/**
	 * Fail cases
	 */
	it(`Fail`)

	/**
	 * Success cases
	 */
	it(`Success`, async () => {
		const proofs = [
			readFileSync(getTestAssetsPath("document.jpg")),
			readFileSync(getTestAssetsPath("document.jpg")),
		]

		const res = await httpApiRequest({
			method,
			endpoint,
			auth,
			isMultipartFormData: true,
			files: { proofs },
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})
		expect(res).empty

		const lawyerProofDir = getLawyerProofDirPath(lawyer.id)
		const files = await getDirFiles(lawyerProofDir)
		expect(files.length).equals(proofs.length)
	})
})
