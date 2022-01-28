import { z } from "zod"
import { userAuth } from "../../core/auth"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../core/http"
import { listReview } from "../../services/review/listReview"
import { sanitizeReview } from "../../services/review/sanitizeReview"
import { getUserOrLawyerFromAuth } from "../../services/user/getUserOrLawyerFromAuth"

const bodySchema = z
	.object({
		include: z
			.object({
				lawyer: z.boolean().optional(),
				user: z.boolean().optional(),
				city: z.boolean().optional(),
				paperType: z.boolean().optional(),
				language: z.boolean().optional(),
				feedbacks: z.boolean().optional(),
				rating: z.boolean().optional(),
			})
			.optional(),
	})
	.strict()

export const apiReviewGetDetails = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/review/:id/details",
	bodySchema,
	paramsSchema: z.object({ id: z.number().int() }).strict(),
	handler: async ({ req, body: { include }, params: { id } }) => {
		const authPayload = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { userId, lawyerId } = await getUserOrLawyerFromAuth(authPayload)

		const [review] = await listReview({ filter: { id, userId, lawyerId }, include })
		if (!review) throw new UnprocessableEntityError("Review not found")

		return sanitizeReview(review)
	},
})
