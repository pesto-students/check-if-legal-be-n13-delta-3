import { ReviewPaymentStatus } from "@prisma/client"
import { z } from "zod"
import { AuthRole } from "../../../core/enums"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { listReview } from "../../../services/review/listReview"
import { getReviewPayment } from "../../../services/reviewPayment/getReviewPayment"
import { updateReviewPaymentStatus } from "../../../services/reviewPayment/updateReviewPayment"

export const apiReviewPaymentGet = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/review/:reviewId/payment",
	paramsSchema: z.object({ reviewId: z.string() }).strict(),
	handler: async ({ req, params }) => {
		const { id: userId } = userAuth(req, [AuthRole.USER])

		const reviewId = +params.reviewId
		const [review] = await listReview({ filter: { id: reviewId, userId } })
		if (!review) throw new UnprocessableEntityError("Invalid review")

		let reviewPayment = await getReviewPayment({ reviewId })
		if (reviewPayment) {
			if (reviewPayment.status !== ReviewPaymentStatus.PAID) {
				reviewPayment = await updateReviewPaymentStatus({ reviewId })
			}
			return reviewPayment
		}
	},
})
