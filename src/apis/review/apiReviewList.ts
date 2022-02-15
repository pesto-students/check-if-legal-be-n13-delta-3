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
		paperTypeId: z.number().int().optional(),
		status: z.nativeEnum(ReviewStatus).optional(),
		limit: z.number().int().optional().default(10),
		pageNo: z.number().int().optional().default(1),
	})
	.strict()

export const apiReviewList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/review",
	bodySchema,
	handler: async ({ req, body }) => {
		const authPayload = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { userId, lawyerId } = await getUserOrLawyerFromAuth(authPayload)

		const { limit, pageNo, paperTypeId, status } = body
		const reviews = await listReview({
			filter: { paperTypeId, status, userId, lawyerId },
			pagination: { limit, pageNo },
			include: {
				lawyer: authPayload.role !== AuthRole.LAWYER,
				user: authPayload.role !== AuthRole.USER,
				city: true,
				paperType: true,
				language: true,
			},
		})

		return reviews.map((review) => sanitizeReview(review))
	},
})
