import { ReviewStatus } from "@prisma/client"
import { z } from "zod"
import { userAuth } from "../../core/auth"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod, UnauthorisedError } from "../../core/http"
import { checkLawyerAuthorization } from "../../services/lawyer/checkLawyerAuthorization"
import { listReview } from "../../services/review/listReview"
import { sanitizeReview } from "../../services/review/sanitizeReview"

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
	method: HttpMethod.POST,
	endpoint: "/review/list",
	bodySchema,
	handler: async ({ req, body: { filter, include } }) => {
		const { id, role } = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])

		let userId: number | undefined = undefined
		let lawyerId: number | undefined = undefined

		if (role === AuthRole.USER) userId = id
		else if (role === AuthRole.LAWYER) {
			const lawyer = await checkLawyerAuthorization(id)
			lawyerId = lawyer.id
		} else throw new UnauthorisedError("User is unauthorized")

		const reviews = await listReview({
			filter: { ...filter, userId, lawyerId },
			include,
		})

		return reviews.map((review) => sanitizeReview(review))
	},
})
