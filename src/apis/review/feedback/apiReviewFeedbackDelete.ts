import { z } from "zod"
import { AuthRole } from "../../../core/enums"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { listReview } from "../../../services/review/listReview"
import { deleteReviewFeedback } from "../../../services/reviewFeedback/deleteReviewFeedback"
import { listReviewFeedback } from "../../../services/reviewFeedback/listReviewFeedback"
import { getUserOrLawyerFromAuth } from "../../../services/user/getUserOrLawyerFromAuth"

export const apiReviewFeedbackDelete = new HttpApi({
	method: HttpMethod.DELETE,
	endpoint: "/review/:reviewId/feedback/:id",
	paramsSchema: z.object({ reviewId: z.string(), id: z.string() }).strict(),
	handler: async ({ req, params }) => {
		const authPayload = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { userId, lawyerId } = await getUserOrLawyerFromAuth(authPayload)
		const isLawyer = authPayload.role === AuthRole.LAWYER

		const reviewId = +params.reviewId
		const id = +params.id

		const [review, reviewFeedback] = await Promise.all([
			listReview({ filter: { id: reviewId, userId, lawyerId } }),
			listReviewFeedback({ filter: { id, reviewId, byLawyer: isLawyer } }),
		])
		if (!review) throw new UnprocessableEntityError("Invalid review")
		if (!reviewFeedback) {
			throw new UnprocessableEntityError("Invalid review feedback")
		}

		await deleteReviewFeedback({ filter: { id } })
	},
})
