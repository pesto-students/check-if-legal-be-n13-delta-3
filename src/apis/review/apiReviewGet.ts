import { z } from "zod"
import { userAuth } from "../../core/auth"
import { AuthRole } from "../../core/enums"
import {
	HttpApi,
	HttpMethod,
	UnauthorisedError,
	UnprocessableEntityError,
} from "../../core/http"
import { checkLawyerAuthorization } from "../../services/lawyer/checkLawyerAuthorization"
import { listReview } from "../../services/review/listReview"
import { sanitizeReview } from "../../services/review/sanitizeReview"

const bodySchema = z
	.object({
		filter: z.object({ id: z.number().int() }),
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

export const apiReviewList = new HttpApi({
	method: HttpMethod.POST,
	endpoint: "/review/get",
	bodySchema,
	handler: async ({ req, body: { filter, include } }) => {
		const { id, role } = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])

		let userId: number | undefined = undefined
		let lawyerId: number | undefined = undefined

		if (role === AuthRole.USER) userId = id
		else if (role === AuthRole.LAWYER) {
			const lawyer = await checkLawyerAuthorization(id)
			lawyerId = lawyer.id
		} else {
			throw new UnauthorisedError("User is unauthorized")
		}

		const [review] = await listReview({
			filter: { ...filter, userId, lawyerId },
			include,
		})
		if (!review) {
			throw new UnprocessableEntityError("Review not found")
		}

		return sanitizeReview(review)
	},
})
