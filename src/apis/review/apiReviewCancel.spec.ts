import { ReviewStatus } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listReview } from "../../services/review/listReview"
import { updateReview } from "../../services/review/updateReview"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateReview } from "../../test/resources/review"
import { generateUser } from "../../test/resources/user"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.DELETE
function getEndpoint(reviewId: number | string) {
	return `/review/${reviewId}`
}

describe(`API: ${method} ${getEndpoint(":id")}`, () => {
	let userId: number
	let auth: string

	before(async () => {
		await truncateDatabase()
		userId = (await generateUser()).id
		auth = createAuthToken({ id: userId, role: AuthRole.USER })
	})

	/**
	 * Success cases
	 */
	it(`Success`, async () => {
		const { id: reviewId } = await generateReview({ userId })
		await updateReview({
			filter: { id: reviewId },
			update: { status: ReviewStatus.INITIAL },
		})

		const res = await httpApiRequest({
			method,
			endpoint: getEndpoint(reviewId),
			auth,
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})
		expect(res).empty

		const [review] = await listReview({ filter: { id: reviewId } })
		expect(review).not.exist
	})
})
