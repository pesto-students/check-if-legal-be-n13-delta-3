import { Lawyer, Review, ReviewFeedback, User } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../../core/http"
import { createAuthToken } from "../../../helpers/auth/authToken"
import { listReviewFeedback } from "../../../services/reviewFeedback/listReviewFeedback"
import { httpApiRequest } from "../../../test/httpApiRequest"
import { generateLawyer } from "../../../test/resources/lawyer"
import { generateReview } from "../../../test/resources/review"
import { generateReviewFeedback } from "../../../test/resources/reviewFeedback"
import { generateUser } from "../../../test/resources/user"
import { truncateDatabase } from "../../../test/truncateDatabase"

const method = HttpMethod.DELETE

function getEndpoint(reviewId: number | string, feedbackId: number | string) {
	return `/review/${reviewId}/feedback/${feedbackId}`
}

describe(`API: ${method} ${getEndpoint(":reviewId", ":feedbackId")}`, () => {
	let user: User
	let lawyer: Lawyer
	let review: Review
	let reviewFeedbackByUser: ReviewFeedback
	let reviewFeedbackByLawyer: ReviewFeedback

	before(async () => {
		await truncateDatabase()
		lawyer = await generateLawyer({ isVerified: true })
		user = await generateUser()

		review = await generateReview({ lawyerId: lawyer.id, userId: user.id })
		reviewFeedbackByLawyer = await generateReviewFeedback({
			reviewId: review.id,
			byLawyer: true,
		})
		reviewFeedbackByUser = await generateReviewFeedback({
			reviewId: review.id,
			byLawyer: false,
		})
	})

	for (const role of [AuthRole.LAWYER, AuthRole.USER]) {
		it(`Success of role(${role})`, async () => {
			const selectedReviewFeedback =
				role === AuthRole.LAWYER ? reviewFeedbackByLawyer : reviewFeedbackByUser

			const id = role === AuthRole.LAWYER ? lawyer.userId : user.id
			const auth = createAuthToken({ id, role })

			const res = await httpApiRequest({
				method,
				endpoint: getEndpoint(review.id, selectedReviewFeedback.id),
				auth,
				expectedStatusCode: HttpStatusCode.NO_CONTENT,
			})
			expect(res).empty

			const [lawyerFeedback] = await listReviewFeedback({
				filter: { id: selectedReviewFeedback.id },
			})
			expect(lawyerFeedback).not.exist
		})
	}
})
