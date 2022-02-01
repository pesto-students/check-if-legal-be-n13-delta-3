import { Lawyer, Review, ReviewFeedback, User } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../../core/enums"
import { HttpMethod } from "../../../core/http"
import { createAuthToken } from "../../../helpers/auth/authToken"
import { httpApiRequest } from "../../../test/httpApiRequest"
import { generateLawyer } from "../../../test/resources/lawyer"
import { generateReview } from "../../../test/resources/review"
import { generateReviewFeedback } from "../../../test/resources/reviewFeedback"
import { generateUser } from "../../../test/resources/user"
import { expectReviewFeedbackSchema } from "../../../test/schemas/reviewFeedback"
import { truncateDatabase } from "../../../test/truncateDatabase"

const method = HttpMethod.GET
function getEndpoint(reviewId: number | string) {
	return `/review/${reviewId}/feedback`
}

describe(`API: ${method} ${getEndpoint(":reviewId")}`, () => {
	let user: User
	let lawyer: Lawyer
	let review: Review
	let feedbacks: ReviewFeedback[]

	before(async () => {
		await truncateDatabase()
		user = await generateUser()
		lawyer = await generateLawyer({ isVerified: true })
		review = await generateReview({ userId: user.id, lawyerId: lawyer.id })

		feedbacks = [
			await generateReviewFeedback({ reviewId: review.id, byLawyer: true }),
			await generateReviewFeedback({ reviewId: review.id, byLawyer: true }),
			await generateReviewFeedback({ reviewId: review.id }),
			await generateReviewFeedback({ reviewId: review.id }),
			await generateReviewFeedback(),
		]
	})

	for (const role of [AuthRole.USER, AuthRole.LAWYER]) {
		it(`Success for role(${role})`, async () => {
			const id = role === AuthRole.USER ? user.id : lawyer.userId
			const auth = createAuthToken({ id, role })

			const res = await httpApiRequest({
				method,
				endpoint: getEndpoint(review.id),
				auth,
			})
			expect(res).exist

			for (const el of res) expectReviewFeedbackSchema(el)

			let expectedList = feedbacks.filter((el) => el.reviewId === review.id)
			expect(res.length).equal(expectedList.length)
		})
	}
})
