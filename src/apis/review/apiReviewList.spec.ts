import { Language, Lawyer, PaperType, Review, User } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateLanguage } from "../../test/resources/language"
import { generateLawyer } from "../../test/resources/lawyer"
import { generatePaperType } from "../../test/resources/paperType"
import { generateReview } from "../../test/resources/review"
import { generateUser } from "../../test/resources/user"
import { expectReviewSchema } from "../../test/schemas/review"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.GET
const endpoint = "/review"

describe(`API: ${endpoint}`, () => {
	let user: User
	let lawyer: Lawyer
	let paperType: PaperType
	let language: Language
	let reviews: Review[]

	before(async () => {
		await truncateDatabase()
		user = await generateUser()
		lawyer = await generateLawyer({ isVerified: true })
		paperType = await generatePaperType()
		language = await generateLanguage()

		reviews = [
			await generateReview(),
			await generateReview({ lawyerId: lawyer.id }),
			await generateReview({ lawyerId: lawyer.id, languageId: language.id }),
			await generateReview({ lawyerId: lawyer.id, paperTypeId: paperType.id }),
			await generateReview({
				lawyerId: lawyer.id,
				paperTypeId: paperType.id,
				languageId: language.id,
			}),
			await generateReview({ userId: user.id }),
			await generateReview({ userId: user.id, languageId: language.id }),
			await generateReview({
				userId: user.id,
				paperTypeId: paperType.id,
				languageId: language.id,
			}),
			await generateReview({ paperTypeId: paperType.id }),
			await generateReview({ languageId: language.id }),
			await generateReview({ lawyerId: lawyer.id, userId: user.id }),
			await generateReview({
				lawyerId: lawyer.id,
				userId: user.id,
				paperTypeId: paperType.id,
			}),
			await generateReview({
				lawyerId: lawyer.id,
				userId: user.id,
				languageId: language.id,
			}),
			await generateReview({
				lawyerId: lawyer.id,
				userId: user.id,
				paperTypeId: paperType.id,
				languageId: language.id,
			}),
		]
	})

	const possibilities: [string, { withPaperTypeId?: boolean }][] = [
		["without filter", {}],
		["with paper-type filter", { withPaperTypeId: true }],
	]

	for (const role of [AuthRole.USER, AuthRole.LAWYER]) {
		for (const [desc, filter] of possibilities) {
			it(`Success for role(${role}) ${desc}`, async () => {
				const id = role === AuthRole.USER ? user.id : lawyer.userId
				const auth = createAuthToken({ id, role })

				const res = await httpApiRequest({
					method,
					endpoint,
					auth,
					body: {
						...(filter.withPaperTypeId && { paperTypeId: paperType.id }),
						...(filter.withPaperTypeId && { paperTypeId: paperType.id }),
					},
				})
				expect(res).exist

				let expectedReviewListCount = 0
				if (role === AuthRole.USER) {
					let filteredReviews = reviews.filter((el) => el.userId === user.id)
					if (filter.withPaperTypeId) {
						filteredReviews = filteredReviews.filter(
							(el) => el.paperTypeId === paperType.id,
						)
					}
					expectedReviewListCount = filteredReviews.length
				} else if (role === AuthRole.LAWYER) {
					let filteredReviews = reviews.filter(
						(el) => el.lawyerId === lawyer.id,
					)
					if (filter.withPaperTypeId) {
						filteredReviews = filteredReviews.filter(
							(el) => el.paperTypeId === paperType.id,
						)
					}
					expectedReviewListCount = filteredReviews.length
				}

				for (const review of res) {
					expectReviewSchema(review)
				}

				expect(res.length).equal(expectedReviewListCount)
			})
		}
	}
})
