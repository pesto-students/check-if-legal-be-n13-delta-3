import { Lawyer, User } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../../core/http"
import { createAuthToken } from "../../../helpers/auth/authToken"
import { httpApiRequest } from "../../../test/httpApiRequest"
import { generateLawyer } from "../../../test/resources/lawyer"
import { generateReviewRating } from "../../../test/resources/reviewRating"
import { generateUser } from "../../../test/resources/user"
import { truncateDatabase } from "../../../test/truncateDatabase"

const method = HttpMethod.DELETE

function getEndpoint(reviewId: number | string) {
	return `/review/${reviewId}/rating`
}

describe(`API: ${method} ${getEndpoint(":reviewId")}`, () => {
	let user: User
	let lawyer: Lawyer

	before(async () => {
		await truncateDatabase()
		user = await generateUser()
		lawyer = await generateLawyer({ isVerified: true })
	})

	/**
	 * Authorizations
	 */
	it(`Auth Fail: lawyer deleting review rating`, async () => {
		const { reviewId } = await generateReviewRating({
			userId: user.id,
			lawyerId: lawyer.id,
		})
		const auth = createAuthToken({ id: lawyer.userId, role: AuthRole.LAWYER })

		await httpApiRequest({
			method,
			endpoint: getEndpoint(reviewId),
			auth,
			expectedStatusCode: HttpStatusCode.FORBIDDEN,
		})
	})

	it(`Success`, async () => {
		const { reviewId } = await generateReviewRating({
			userId: user.id,
			lawyerId: lawyer.id,
		})
		const auth = createAuthToken({ id: user.id, role: AuthRole.USER })

		const res = await httpApiRequest({
			method,
			endpoint: getEndpoint(reviewId),
			auth,
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})
		expect(res).empty
	})
})
