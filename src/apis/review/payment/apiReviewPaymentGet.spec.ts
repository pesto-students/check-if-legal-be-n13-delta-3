import { Review, User } from "@prisma/client"
import { expect } from "chai"
import _ from "lodash"
import { AuthRole } from "../../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../../core/http"
import { createAuthToken } from "../../../helpers/auth/authToken"
import { createReviewPayment } from "../../../services/reviewPayment/createReviewPayment"
import { httpApiRequest } from "../../../test/httpApiRequest"
import { generateReview } from "../../../test/resources/review"
import { generateUser } from "../../../test/resources/user"
import { expectReviewPaymentSchema } from "../../../test/schemas/reviewPayment"
import { truncateDatabase } from "../../../test/truncateDatabase"

const method = HttpMethod.GET
function getEndpoint(reviewId: number | string) {
	return `/review/${reviewId}/payment`
}

describe(`API: ${method} ${getEndpoint(":reviewId")}`, () => {
	let user: User
	let review: Review
	let auth: string

	before(async () => {
		await truncateDatabase()
		user = await generateUser()
		review = await generateReview({ userId: user.id })
		auth = createAuthToken({ id: user.id, role: AuthRole.USER })
	})

	it(`Success: with no payment in review`, async () => {
		const res = await httpApiRequest({
			method,
			endpoint: getEndpoint(review.id),
			auth,
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})
		expect(res).empty
	})

	it(`Success: with payment in review`, async () => {
		const { orderId, status } = await createReviewPayment({ reviewId: review.id })

		const res = await httpApiRequest({
			method,
			endpoint: getEndpoint(review.id),
			auth,
		})
		expect(res).exist
		expectReviewPaymentSchema(res)

		expect(res.reviewId).to.equal(review.id)
		expect(res.amountInPaisa).to.equal(_.round(review.price * 100))
		expect(res.orderId).to.equal(orderId)
		expect(res.status).to.equal(status)
	})
})
