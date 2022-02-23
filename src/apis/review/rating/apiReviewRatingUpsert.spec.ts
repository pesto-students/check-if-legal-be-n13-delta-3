import { randNumber, randProductDescription } from "@ngneat/falso"
import { ReviewStatus, User } from "@prisma/client"
import { expect } from "chai"
import _ from "lodash"
import { AuthRole } from "../../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../../core/http"
import { createAuthToken } from "../../../helpers/auth/authToken"
import { updateReview } from "../../../services/review/updateReview"
import { listReviewRating } from "../../../services/reviewRating/listReviewRating"
import { httpApiRequest } from "../../../test/httpApiRequest"
import { generateLawyer } from "../../../test/resources/lawyer"
import { generateReview } from "../../../test/resources/review"
import { generateReviewRating } from "../../../test/resources/reviewRating"
import { generateUser } from "../../../test/resources/user"
import { truncateDatabase } from "../../../test/truncateDatabase"

const method = HttpMethod.PUT
function getEndpoint(reviewId: number | string) {
	return `/review/${reviewId}/rating`
}

describe(`API: ${method} ${getEndpoint(":reviewId")}`, () => {
	let user: User
	let auth: string

	before(async () => {
		await truncateDatabase()
		user = await generateUser()
		auth = createAuthToken({ id: user.id, role: AuthRole.USER })
	})

	/**
	 * Authorizations
	 */
	it(`Auth Fail: lawyer creating review rating`, async () => {
		const lawyer = await generateLawyer({ isVerified: true })
		const { id: reviewId } = await generateReview({
			userId: user.id,
			lawyerId: lawyer.id,
		})
		const auth = createAuthToken({ id: lawyer.userId, role: AuthRole.LAWYER })

		await updateReview({
			filter: { id: reviewId },
			update: { status: ReviewStatus.CLOSED },
		})
		const rating = randNumber({ min: 1, max: 5 })
		const comment = randProductDescription()

		await httpApiRequest({
			method,
			endpoint: getEndpoint(reviewId),
			auth,
			body: { rating, comment },
			expectedStatusCode: HttpStatusCode.FORBIDDEN,
		})
	})

	/**
	 * Fail cases
	 */
	const reviewStatuses = _.values(ReviewStatus).filter((s) => s !== ReviewStatus.CLOSED)
	for (const status of reviewStatuses) {
		it(`Fail: when review status is ${status}`, async () => {
			const { id: reviewId } = await generateReview({ userId: user.id })
			await updateReview({ filter: { id: reviewId }, update: { status } })

			const rating = randNumber({ min: 1, max: 5 })
			const comment = randProductDescription()

			await httpApiRequest({
				method,
				endpoint: getEndpoint(reviewId),
				auth,
				body: { rating, comment },
				expectedStatusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
			})
		})
	}

	/**
	 * Success cases
	 */
	it(`Success: when review status is CLOSED`, async () => {
		const { id: reviewId } = await generateReview({ userId: user.id })
		await updateReview({
			filter: { id: reviewId },
			update: { status: ReviewStatus.CLOSED },
		})

		const rating = randNumber({ min: 1, max: 5 })
		const comment = randProductDescription()

		const res = await httpApiRequest({
			method,
			endpoint: getEndpoint(reviewId),
			auth,
			body: { rating, comment },
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})
		expect(res).empty

		const [reviewRating] = await listReviewRating({ filter: { reviewId } })
		expect(reviewRating).exist
		expect(reviewRating.reviewId).equal(reviewId)
		expect(reviewRating.rating).equal(rating)
		expect(reviewRating.comment).equal(comment)
	})

	/**
	 * Success cases
	 */
	it(`Success: updating review rating`, async () => {
		const { reviewId } = await generateReviewRating({ userId: user.id })

		const rating = randNumber({ min: 1, max: 5 })
		const comment = randProductDescription()

		const res = await httpApiRequest({
			method,
			endpoint: getEndpoint(reviewId),
			auth,
			body: { rating, comment },
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})
		expect(res).empty

		const [reviewRating] = await listReviewRating({ filter: { reviewId } })
		expect(reviewRating).exist
		expect(reviewRating.reviewId).equal(reviewId)
		expect(reviewRating.rating).equal(rating)
		expect(reviewRating.comment).equal(comment)
	})
})
