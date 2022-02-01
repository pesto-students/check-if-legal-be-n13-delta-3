import { randJobDescriptor } from "@ngneat/falso"
import { Lawyer } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateLanguage } from "../../test/resources/language"
import { generateLawyer } from "../../test/resources/lawyer"
import {
	generateOffering,
	randomOfferingPrice,
	randomOfferingTimeDuration,
} from "../../test/resources/offering"
import { generatePaperType } from "../../test/resources/paperType"
import { expectOfferingSchema } from "../../test/schemas/offering"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.PATCH
function getEndpoint(offeringId: number | string) {
	return `/offering/${offeringId}`
}

describe(`API: ${getEndpoint(":id")}`, () => {
	let lawyer: Lawyer
	let auth: string
	let paperTypeId: number
	let languageId: number

	before(async () => {
		await truncateDatabase()
		lawyer = await generateLawyer({ isVerified: true })
		auth = createAuthToken({ id: lawyer.userId, role: AuthRole.LAWYER })
		paperTypeId = (await generatePaperType()).id
		languageId = (await generateLanguage()).id
	})

	const possibilities: [
		string,
		{
			paperType?: boolean
			language?: boolean
			price?: boolean
			description?: boolean
			expectedTimeInHours?: boolean
			isAvailable?: boolean
		},
	][] = [
		["update paper-type", { paperType: true }],
		["update language", { language: true }],
		["update price", { price: true }],
		["update description", { description: true }],
		["update expectedTimeInHours", { expectedTimeInHours: true }],
		["update isAvailable", { isAvailable: true }],
	]

	for (const [desc, toUpdate] of possibilities) {
		it(`Success ${desc}`, async () => {
			const offering = await generateOffering({ lawyerId: lawyer.id })

			const price = randomOfferingPrice()
			const expectedTimeInHours = randomOfferingTimeDuration()
			const description = randJobDescriptor()
			const isAvailable = false

			const res = await httpApiRequest({
				method,
				endpoint: getEndpoint(offering.id),
				auth,
				body: {
					...(toUpdate.paperType && { paperTypeId }),
					...(toUpdate.language && { languageId }),
					...(toUpdate.price && { price }),
					...(toUpdate.expectedTimeInHours && { expectedTimeInHours }),
					...(toUpdate.description && { description }),
					...(toUpdate.isAvailable && { isAvailable }),
				},
			})
			expect(res).exist
			expectOfferingSchema(res)
		})
	}
})
