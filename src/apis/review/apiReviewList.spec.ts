import { Lawyer, User } from "@prisma/client"
import { expect } from "chai"
import { createAuthToken } from "../../core/auth"
import { AuthRole } from "../../core/enums"
import { HttpMethod } from "../../core/http"
import { httpApiRequest } from "../../core/test/httpApiRequest"
import { generateLawyer } from "../../core/test/resources/lawyer"
import { generateReview } from "../../core/test/resources/review"
import { generateUser } from "../../core/test/resources/user"
import { truncateDatabase } from "../../core/test/truncateDatabase"

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
