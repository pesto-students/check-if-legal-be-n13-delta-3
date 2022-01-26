import { ReviewStatus } from "@prisma/client"
import { expect } from "chai"
import { createAuthToken } from "../../core/auth"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { httpApiRequest } from "../../core/test/httpApiRequest"
import { generateLawyer } from "../../core/test/resources/lawyer"
import { generateOffering } from "../../core/test/resources/offering"
import { generateUser } from "../../core/test/resources/user"
import { truncateDatabase } from "../../core/test/truncateDatabase"
import { listReview } from "../../services/review/listReview"

const method = HttpMethod.POST
const endpoint = "/review"

describe(`API: ${endpoint}`, () => {
	let userId: number

	before(async () => {
		await truncateDatabase()
		userId = (await generateUser()).id
	})

	/**
	 * Fail cases
	 */
	it(`Fail`)

	/**
	 * Success cases
	 */
	it(`Success`, async () => {
		const auth = createAuthToken({ id: userId, role: AuthRole.USER })
		const { id: lawyerId, cityId } = await generateLawyer({ isVerified: true })
		const {
			id: offeringId,
			paperTypeId,
			languageId,
		} = await generateOffering({ lawyerId })

		const res = await httpApiRequest({
			method,
			endpoint,
			auth,
			body: { offeringId, cityId },
			expectedStatusCode: HttpStatusCode.CREATED,
		})
		expect(res).exist
		expect(res.id).exist

		const [review] = await listReview({ filter: { id: res.id } })
		expect(review).exist
		expect(review.id).equal(res.id)
		expect(review.userId).equal(userId)
		expect(review.lawyerId).equal(lawyerId)
		expect(review.cityId).equal(cityId)
		expect(review.paperTypeId).equal(paperTypeId)
		expect(review.languageId).equal(languageId)
		expect(review.status).equal(ReviewStatus.INITIAL)
	})
})
