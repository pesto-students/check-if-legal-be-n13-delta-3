import { z } from "zod"
import { AuthRole } from "../../../core/enums"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { listReview } from "../../../services/review/listReview"
import { listReviewRating } from "../../../services/reviewRating/listReviewRating"
import { getUserOrLawyerFromAuth } from "../../../services/user/getUserOrLawyerFromAuth"

export const apiReviewRatingGet = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/review/:reviewId/rating",
	paramsSchema: z.object({ reviewId: z.string() }).strict(),
	handler: async ({ req, params }) => {
		const auth = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { lawyerId, userId } = await getUserOrLawyerFromAuth(auth)
		const reviewId = +params.reviewId

		const [review] = await listReview({ filter: { id: reviewId, userId, lawyerId } })
		if (!review) throw new UnprocessableEntityError("Review not found")

		const [reviewRating] = await listReviewRating({ filter: { reviewId } })
		return reviewRating ?? null
	},
})
