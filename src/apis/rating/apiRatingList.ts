import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { listReviewRating } from "../../services/reviewRating/listReviewRating"
import { getUserOrLawyerFromAuth } from "../../services/user/getUserOrLawyerFromAuth"

const querySchema = z
	.object({
		limit: z.string().optional(),
		pageNo: z.string().optional(),
	})
	.strict()

export const apiRatingList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/rating",
	querySchema,
	handler: async ({ req, query }) => {
		const auth = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { userId, lawyerId } = await getUserOrLawyerFromAuth(auth)

		const limit = query.limit ? +query.limit : 10
		const pageNo = query.pageNo ? +query.pageNo : 1

		return await listReviewRating({
			filter: { userId, lawyerId },
			pagination: { limit, pageNo },
			include: {
				user: auth.role !== AuthRole.USER,
				lawyer: auth.role !== AuthRole.LAWYER,
			},
		})
	},
})
