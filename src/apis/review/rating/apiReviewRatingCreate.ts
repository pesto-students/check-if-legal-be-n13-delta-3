import { z } from "zod"
import { AuthRole } from "../../../core/enums"
import {
	createdResponse,
	HttpApi,
	HttpMethod,
	UnprocessableEntityError,
} from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { listReview } from "../../../services/review/listReview"
import { createReviewRating } from "../../../services/reviewRating/createReviewRating"

const bodySchema = z
	.object({ rating: z.number().int().max(5), comment: z.string().max(300) })
	.strict()

export const apiReviewRatingCreate = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/review/:reviewId/rating",
	bodySchema,
	paramsSchema: z.object({ reviewId: z.string() }).strict(),
	handler: async ({ req, body, params }) => {
		const { id: userId } = userAuth(req, [AuthRole.USER])
		const reviewId = +params.reviewId

		const [review] = await listReview({ filter: { id: reviewId, userId } })
		if (!review) throw new UnprocessableEntityError("Review not found")

		const reviewRating = await createReviewRating({ ...body, reviewId })
		return createdResponse({ id: reviewRating.id })
	},
})
