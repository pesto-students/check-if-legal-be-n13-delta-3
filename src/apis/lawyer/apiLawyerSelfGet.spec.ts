import { Lawyer } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateLawyer } from "../../test/resources/lawyer"
import { generateUser } from "../../test/resources/user"
import { expectLawyerSchema } from "../../test/schemas/lawyer"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.GET
const endpoint = "/lawyer/self"

describe(`API: ${endpoint}`, () => {
	let auth: string
	let lawyer: Lawyer

	before(async () => {
		await truncateDatabase()
		const user = await generateUser({ isLawyer: true })
		lawyer = await generateLawyer({ userId: user.id })
		auth = createAuthToken({ id: user.id, role: AuthRole.LAWYER })
	})

	/**
	 * Authentication
	 */
	it(`Authentication: Fail without token`, async () => {
		await httpApiRequest({
			method,
			endpoint,
			expectedStatusCode: HttpStatusCode.FORBIDDEN,
		})
	})

	/**
	 * Success
	 */
	it("Success", async () => {
		const res = await httpApiRequest({ method, endpoint, auth })
		expect(res).exist
		expectLawyerSchema(res, AuthRole.LAWYER)
		expect(res.id).eq(lawyer.id)
	})
})
