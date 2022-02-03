import { ReviewPaymentStatus, ReviewStatus, User } from "@prisma/client"
import { expect } from "chai"
import _ from "lodash"
import { AuthRole } from "../../../core/enums"
import { HttpMethod } from "../../../core/http"
import { createAuthToken } from "../../../helpers/auth/authToken"
import { updateReview } from "../../../services/review/updateReview"
import { getReviewPayment } from "../../../services/reviewPayment/getReviewPayment"
import { httpApiRequest } from "../../../test/httpApiRequest"
import { generateReview } from "../../../test/resources/review"
import { generateUser } from "../../../test/resources/user"
import { truncateDatabase } from "../../../test/truncateDatabase"

const method = HttpMethod.GET
function getEndpoint(reviewId: number | string) {
	return `/review/${reviewId}/payment/intent`
}

describe(`API: ${method} ${getEndpoint(":reviewId")}`, () => {
	let user: User

	before(async () => {
		await truncateDatabase()
		user = await generateUser()
	})

	it(`Success`, async () => {
		const review = await generateReview({ userId: user.id })
		await updateReview({
			filter: { id: review.id },
			update: { status: ReviewStatus.WAITING_FOR_PAYMENT },
		})

		const auth = createAuthToken({ id: user.id, role: AuthRole.USER })
		const res = await httpApiRequest({
			method,
			endpoint: getEndpoint(review.id),
			auth,
		})
		expect(res).exist
		expect(res.orderId).exist
		expect(res.idKey).exist

		const reviewPayment = await getReviewPayment({ reviewId: review.id })
		expect(reviewPayment).not.null
		if (reviewPayment) {
			expect(reviewPayment.orderId).equal(res.orderId)
			expect(reviewPayment.amountInPaisa).equal(_.round(review.price * 100))
			expect(reviewPayment.status).equal(ReviewPaymentStatus.CREATED)
		}
	})
})
