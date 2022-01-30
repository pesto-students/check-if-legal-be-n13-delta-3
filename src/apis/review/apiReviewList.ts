import { ReviewStatus } from "@prisma/client"
import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { listReview } from "../../services/review/listReview"
import { sanitizeReview } from "../../services/review/sanitizeReview"
import { getUserOrLawyerFromAuth } from "../../services/user/getUserOrLawyerFromAuth"

const bodySchema = z
	.object({
		filter: z
			.object({
				paperTypeId: z.number().int().optional(),
				status: z.nativeEnum(ReviewStatus).optional(),
			})
			.optional(),
		include: z
			.object({
				lawyer: z.boolean().optional(),
				user: z.boolean().optional(),
				city: z.boolean().optional(),
				paperType: z.boolean().optional(),
				language: z.boolean().optional(),
			})
			.optional(),
	})
	.strict()

export const apiReviewList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/review",
	bodySchema,
	handler: async ({ req, body: { filter, include } }) => {
		const authPayload = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { userId, lawyerId } = await getUserOrLawyerFromAuth(authPayload)

		const reviews = await listReview({
			filter: { ...filter, userId, lawyerId },
			include,
		})

		return reviews.map((review) => sanitizeReview(review))
	},
})
