import { z } from "zod"
import { AuthRole } from "../../../core/enums"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { listReview } from "../../../services/review/listReview"
import { deleteReviewRating } from "../../../services/reviewRating/deleteReviewRating"

export const apiReviewRatingDelete = new HttpApi({
	method: HttpMethod.DELETE,
	endpoint: "/review/:reviewId/rating",
	paramsSchema: z.object({ reviewId: z.string() }).strict(),
	handler: async ({ req, params }) => {
		const { id: userId } = userAuth(req, [AuthRole.USER])
		const reviewId = +params.reviewId

		const [review] = await listReview({ filter: { id: reviewId, userId } })
		if (!review) throw new UnprocessableEntityError("Review not found")

		await deleteReviewRating({ reviewId })
	},
})
