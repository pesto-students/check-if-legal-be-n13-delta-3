import { randJobDescriptor } from "@ngneat/falso"
import { Lawyer, ReviewStatus, User } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../../core/http"
import { createAuthToken } from "../../../helpers/auth/authToken"
import { updateReview } from "../../../services/review/updateReview"
import { listReviewFeedback } from "../../../services/reviewFeedback/listReviewFeedback"
import { httpApiRequest } from "../../../test/httpApiRequest"
import { generateLawyer } from "../../../test/resources/lawyer"
import { generateReview } from "../../../test/resources/review"
import { generateUser } from "../../../test/resources/user"
import { truncateDatabase } from "../../../test/truncateDatabase"

const method = HttpMethod.POST
function getEndpoint(reviewId: number | string) {
	return `/review/${reviewId}/feedback`
}

describe(`API: ${method} ${getEndpoint(":reviewId")}`, () => {
	let user: User
	let lawyer: Lawyer

	before(async () => {
		await truncateDatabase()
		lawyer = await generateLawyer({ isVerified: true })
		user = await generateUser()
	})

	for (const role of [AuthRole.USER, AuthRole.LAWYER]) {
		it(`Success of role(${role})`, async () => {
			const review = await generateReview({ userId: user.id, lawyerId: lawyer.id })
			await updateReview({
				filter: { id: review.id },
				update: { status: ReviewStatus.IN_REVIEW },
			})
			const description = randJobDescriptor()

			const userId = role === AuthRole.USER ? user.id : lawyer.userId
			const auth = createAuthToken({ id: userId, role })
			const res = await httpApiRequest({
				method,
				endpoint: getEndpoint(review.id),
				auth,
				body: { description },
				expectedStatusCode: HttpStatusCode.CREATED,
			})
			expect(res).exist
			expect(res.id).exist

			const [reviewFeedback] = await listReviewFeedback({ filter: { id: res.id } })
			expect(reviewFeedback).exist
			expect(reviewFeedback.id).equal(res.id)
			expect(reviewFeedback.description).equal(description)
			expect(reviewFeedback.byLawyer).equal(role === AuthRole.LAWYER)
		})
	}
})
