import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { listReview } from "../../services/review/listReview"
import { sanitizeReview } from "../../services/review/sanitizeReview"
import { getUserOrLawyerFromAuth } from "../../services/user/getUserOrLawyerFromAuth"

export const apiReviewGet = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/review/:id",
	paramsSchema: z.object({ id: z.string() }).strict(),
	handler: async ({ req, params }) => {
		const authPayload = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { userId, lawyerId } = await getUserOrLawyerFromAuth(authPayload)
		const id = +params.id

		const [review] = await listReview({
			filter: { id, userId, lawyerId },
			include: {
				rating: true,
				city: true,
				paperType: true,
				language: true,
				lawyer: authPayload.role !== AuthRole.LAWYER,
				user: authPayload.role !== AuthRole.USER,
			},
		})
		if (!review) throw new UnprocessableEntityError("Review not found")

		return sanitizeReview(review)
	},
})
