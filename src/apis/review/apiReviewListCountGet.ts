import { ReviewStatus } from "@prisma/client"
import { z } from "zod"
import { AuthRole } from "../../core/enums"
import { HttpApi, HttpMethod } from "../../core/http"
import { userAuth } from "../../helpers/auth/userAuth"
import { getReviewCount } from "../../services/review/getReviewCount"
import { getUserOrLawyerFromAuth } from "../../services/user/getUserOrLawyerFromAuth"

const querySchema = z
	.object({
		paperTypeId: z.string().optional(),
		status: z.nativeEnum(ReviewStatus).optional(),
	})
	.strict()

export const apiReviewListCountGet = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/review/count",
	querySchema,
	handler: async ({ req, query }) => {
		const authPayload = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { userId, lawyerId } = await getUserOrLawyerFromAuth(authPayload)

		let isPaymentPaid = authPayload.role === AuthRole.LAWYER ? true : undefined
		const paperTypeId = query.paperTypeId ? +query.paperTypeId : undefined
		const status = query.status

		return await getReviewCount({
			paperTypeId,
			status,
			userId,
			lawyerId,
			isPaymentPaid,
		})
	},
})
