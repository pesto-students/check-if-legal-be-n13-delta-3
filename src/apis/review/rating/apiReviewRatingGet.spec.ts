import { Lawyer, User } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../../core/http"
import { createAuthToken } from "../../../helpers/auth/authToken"
import { httpApiRequest } from "../../../test/httpApiRequest"
import { generateLawyer } from "../../../test/resources/lawyer"
import { generateReview } from "../../../test/resources/review"
import { generateReviewRating } from "../../../test/resources/reviewRating"
import { generateUser } from "../../../test/resources/user"
import { expectReviewRatingSchema } from "../../../test/schemas/reviewRating"
import { truncateDatabase } from "../../../test/truncateDatabase"

const method = HttpMethod.GET

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

	for (const role of [AuthRole.USER, AuthRole.LAWYER]) {
		it(`Success: with no rating for role(${role})`, async () => {
			const review = await generateReview({ userId: user.id, lawyerId: lawyer.id })
			const id = role === AuthRole.USER ? user.id : lawyer.userId
			const auth = createAuthToken({ id, role })

			const res = await httpApiRequest({
				method,
				endpoint: getEndpoint(review.id),
				auth,
				expectedStatusCode: HttpStatusCode.NO_CONTENT,
			})
			expect(res).empty
		})
	}

	for (const role of [AuthRole.USER, AuthRole.LAWYER]) {
		it(`Success: with rating for role(${role})`, async () => {
			const reviewRating = await generateReviewRating({
				userId: user.id,
				lawyerId: lawyer.id,
			})

			const id = role === AuthRole.USER ? user.id : lawyer.userId
			const auth = createAuthToken({ id, role })

			const res = await httpApiRequest({
				method,
				endpoint: getEndpoint(reviewRating.reviewId),
				auth,
			})
			expect(res).exist
			expectReviewRatingSchema(res)
		})
	}
})
