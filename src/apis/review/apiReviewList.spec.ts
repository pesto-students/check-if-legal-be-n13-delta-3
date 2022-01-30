import { Lawyer, User } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateLawyer } from "../../test/resources/lawyer"
import { generateReview } from "../../test/resources/review"
import { generateUser } from "../../test/resources/user"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.GET
const endpoint = "/review"

describe(`API: ${endpoint}`, () => {
	let user: User
	let lawyer: Lawyer

	before(async () => {
		await truncateDatabase()
		user = await generateUser()
		lawyer = await generateLawyer({ isVerified: true })

		await generateReview({ lawyerId: lawyer.id })
		await generateReview({ lawyerId: lawyer.id })
		await generateReview({ lawyerId: lawyer.id })
		await generateReview({ lawyerId: lawyer.id })
	})

	/**
	 * Fail cases
	 */
	it(`Fail`)

	/**
	 * Success cases
	 */
	for (const role of [AuthRole.USER, AuthRole.LAWYER]) {
		it(`Success`, async () => {
			const id = role === AuthRole.USER ? user.id : lawyer.userId
			const auth = createAuthToken({ id, role })

			const res = await httpApiRequest({ method, endpoint, auth })
			expect(res).exist
		})
	}
})
