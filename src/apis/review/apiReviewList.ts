import { ReviewStatus } from "@prisma/client"
import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { listReview } from "../../services/review/listReview"
import { sanitizeReview } from "../../services/review/sanitizeReview"
import { getUserOrLawyerFromAuth } from "../../services/user/getUserOrLawyerFromAuth"

const querySchema = z
	.object({
		paperTypeId: z.string().optional(),
		status: z.nativeEnum(ReviewStatus).optional(),
		limit: z.string().optional(),
		pageNo: z.string().optional(),
	})
	.strict()

export const apiReviewList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/review",
	querySchema,
	handler: async ({ req, query }) => {
		const authPayload = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { userId, lawyerId } = await getUserOrLawyerFromAuth(authPayload)

		let isPaymentPaid = authPayload.role === AuthRole.LAWYER ? true : undefined
		const paperTypeId = query.paperTypeId ? +query.paperTypeId : undefined
		const status = query.status
		const limit = query.limit ? +query.limit : 10
		const pageNo = query.pageNo ? +query.pageNo : 1

		const reviews = await listReview({
			filter: { paperTypeId, status, userId, lawyerId, isPaymentPaid },
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
