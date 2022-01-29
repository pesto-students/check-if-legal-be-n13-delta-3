import { z } from "zod"
import { AuthRole } from "../../../core/enums"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { listReview } from "../../../services/review/listReview"
import { createReviewFeedback } from "../../../services/reviewFeedback/createReviewFeedback"
import { getUserOrLawyerFromAuth } from "../../../services/user/getUserOrLawyerFromAuth"

const bodySchema = z.object({ description: z.string().max(1000) }).strict()

export const apiReviewFeedbackCreate = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/review/:reviewId/feedback",
	bodySchema,
	paramsSchema: z.object({ reviewId: z.number().int() }).strict(),
	handler: async ({ req, body, params: { reviewId } }) => {
		const authPayload = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { userId, lawyerId } = await getUserOrLawyerFromAuth(authPayload)

		const [review] = await listReview({ filter: { id: reviewId, userId, lawyerId } })
		if (!review) throw new UnprocessableEntityError("Invalid review")

		const byLawyer = authPayload.role === AuthRole.LAWYER
		await createReviewFeedback({ ...body, reviewId, byLawyer })
	},
})
