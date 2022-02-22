import { ReviewPaymentStatus } from "@prisma/client"
import { z } from "zod"
import configs from "../../../core/configs"
import { AuthRole } from "../../../core/enums"
import {
	ConflictError,
	HttpApi,
	HttpMethod,
	UnprocessableEntityError,
} from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { listReview } from "../../../services/review/listReview"
import { createReviewPayment } from "../../../services/reviewPayment/createReviewPayment"
import { getReviewPayment } from "../../../services/reviewPayment/getReviewPayment"
import { updateReviewPaymentStatus } from "../../../services/reviewPayment/updateReviewPayment"

export const apiReviewPaymentIntentGet = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/review/:reviewId/payment/intent",
	paramsSchema: z.object({ reviewId: z.string() }).strict(),
	handler: async ({ req, params }) => {
		const { id: userId } = userAuth(req, [AuthRole.USER])

		const reviewId = +params.reviewId
		const [review] = await listReview({ filter: { id: reviewId, userId } })
		if (!review) throw new UnprocessableEntityError("Invalid review")

		let reviewPayment = await getReviewPayment({ reviewId })
		if (reviewPayment) {
			reviewPayment = await updateReviewPaymentStatus({ reviewId })
		} else {
			reviewPayment = await createReviewPayment({ reviewId })
		}

		if (reviewPayment.status === ReviewPaymentStatus.PAID) {
			throw new ConflictError("Review payment is already paid")
		}

		return {
			orderId: reviewPayment.orderId,
			amount: reviewPayment.amountInPaisa,
			currency: "INR",
			idKey: configs.razorpay.idKey,
			name: "Check If Legal",
		}
	},
})
