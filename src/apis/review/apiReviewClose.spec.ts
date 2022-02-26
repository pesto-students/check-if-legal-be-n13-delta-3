import { Lawyer, ReviewStatus } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listReview } from "../../services/review/listReview"
import { updateReview } from "../../services/review/updateReview"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateLawyer } from "../../test/resources/lawyer"
import { generateReview } from "../../test/resources/review"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.POST
function getEndpoint(reviewId: number | string) {
	return `/review/${reviewId}/close`
}

describe(`API: ${method} ${getEndpoint(":reviewId")}`, () => {
	let lawyer: Lawyer
	let auth: string

	before(async () => {
		await truncateDatabase()
		lawyer = await generateLawyer({ isVerified: true })
		auth = createAuthToken({ id: lawyer.userId, role: AuthRole.LAWYER })
	})

	/**
	 * Success cases
	 */
	it(`Success`, async () => {
		const { id: reviewId } = await generateReview({ lawyerId: lawyer.id })
		await updateReview({
			filter: { id: reviewId },
			update: { status: ReviewStatus.PENDING_FOR_REVIEW },
		})

		const res = await httpApiRequest({
			method,
			endpoint: getEndpoint(reviewId),
			auth,
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})
		expect(res).empty

		const [review] = await listReview({ filter: { id: reviewId } })
		expect(review).exist
		expect(review.id).equal(reviewId)
		expect(review.status).equal(ReviewStatus.CLOSED)
	})
})
