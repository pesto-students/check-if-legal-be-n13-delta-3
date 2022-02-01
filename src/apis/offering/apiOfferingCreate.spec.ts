import { randJobDescriptor, randProduct } from "@ngneat/falso"
import { Lawyer } from "@prisma/client"
import { expect } from "chai"
import _ from "lodash"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listOffering } from "../../services/offering/listOffering"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateLanguage } from "../../test/resources/language"
import { generateLawyer } from "../../test/resources/lawyer"
import { generatePaperType } from "../../test/resources/paperType"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.POST
const endpoint = "/offering"

describe(`API: ${endpoint}`, () => {
	let lawyer: Lawyer
	let auth: string

	before(async () => {
		await truncateDatabase()
		lawyer = await generateLawyer({ isVerified: true })
		auth = createAuthToken({ id: lawyer.userId, role: AuthRole.LAWYER })
	})

	it(`Success`, async () => {
		const languageId = (await generateLanguage()).id
		const paperTypeId = (await generatePaperType()).id
		const description = randJobDescriptor()
		const price = +randProduct().price
		const expectedTimeInHours = _.random(48, 72)

		const res = await httpApiRequest({
			method,
			endpoint,
			auth,
			body: { languageId, paperTypeId, description, price, expectedTimeInHours },
			expectedStatusCode: HttpStatusCode.CREATED,
		})
		expect(res).exist
		expect(res.id).exist

		const [offering] = await listOffering({ filter: { id: res.id } })
		expect(offering).exist
		expect(offering.id).equal(res.id)
		expect(offering.lawyerId).equal(lawyer.id)
		expect(offering.paperTypeId).equal(paperTypeId)
		expect(offering.languageId).equal(languageId)
		expect(offering.expectedTimeInHours).equal(expectedTimeInHours)
		expect(offering.price).equal(price)
		expect(offering.description).equal(description)
		expect(offering.isAvailable).equal(true)
	})
})
