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
	paramsSchema: z
		.object({
			reviewId: z.number().int(),
			id: z.number().int(),
		})
		.strict(),
	handler: async ({ req, params: { reviewId, id } }) => {
		const authPayload = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { userId, lawyerId } = await getUserOrLawyerFromAuth(authPayload)
		const isLawyer = authPayload.role === AuthRole.LAWYER

		const [review] = await listReview({ filter: { id: reviewId, userId, lawyerId } })
		if (!review) throw new UnprocessableEntityError("Invalid review")

		const [reviewFeedback] = await listReviewFeedback({
			filter: { id, reviewId, byLawyer: isLawyer },
		})
		if (!reviewFeedback) {
			throw new UnprocessableEntityError("Invalid review feedback")
		}

		await deleteReviewFeedback({ filter: { id } })
	},
})
