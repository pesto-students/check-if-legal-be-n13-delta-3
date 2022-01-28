import { z } from "zod"
import { userAuth } from "../../core/auth"
import { AuthRole } from "../../core/enums"
import { createdResponse, HttpApi, HttpMethod } from "../../core/http"
import { createReview } from "../../services/review/createReview"

const bodySchema = z
	.object({ offeringId: z.number().int(), cityId: z.number().int() })
	.strict()

export const apiReviewCreate = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/review/create",
	bodySchema,
	handler: async ({ req, body }) => {
		const { id: userId } = userAuth(req, [AuthRole.USER])
		const review = await createReview({ ...body, userId })
		return createdResponse({ id: review.id })
	},
})
