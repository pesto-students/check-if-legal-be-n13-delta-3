import { z } from "zod"
import { AuthRole } from "../../../core/enums"
import { HttpApi, HttpMethod } from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { listReviewPayment } from "../../../services/reviewPayment/listReviewPayment"

const querySchema = z
	.object({
		limit: z.string().optional(),
		pageNo: z.string().optional(),
	})
	.strict()

export const apiPaymentList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/payment",
	querySchema,
	handler: async ({ req, query }) => {
		const { id: userId } = userAuth(req, [AuthRole.USER])

		const limit = query.limit ? +query.limit : 10
		const pageNo = query.pageNo ? +query.pageNo : 1

		return await listReviewPayment({
			filter: { userId },
			pagination: { limit, pageNo },
		})
	},
})
