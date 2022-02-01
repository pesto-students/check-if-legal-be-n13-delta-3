import { z } from "zod"
import { AuthRole } from "../../../core/enums"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { listReview } from "../../../services/review/listReview"
import { listReviewFeedback } from "../../../services/reviewFeedback/listReviewFeedback"
import { getUserOrLawyerFromAuth } from "../../../services/user/getUserOrLawyerFromAuth"

export const apiReviewFeedbackList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/review/:reviewId/feedback",
	paramsSchema: z.object({ reviewId: z.string() }).strict(),
	handler: async ({ req, params }) => {
		const authPayload = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { userId, lawyerId } = await getUserOrLawyerFromAuth(authPayload)

		const reviewId = +params.reviewId
		const [review] = await listReview({ filter: { id: reviewId, userId, lawyerId } })
		if (!review) throw new UnprocessableEntityError("Invalid review")

		return await listReviewFeedback({ filter: { reviewId } })
	},
})
