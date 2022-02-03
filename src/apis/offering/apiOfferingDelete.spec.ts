import { Lawyer, Offering } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listOffering } from "../../services/offering/listOffering"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateLawyer } from "../../test/resources/lawyer"
import { generateOffering } from "../../test/resources/offering"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.DELETE
function getEndpoint(offeringId: number | string) {
	return `/offering/${offeringId}`
}

describe(`API: ${getEndpoint(":id")}`, () => {
	let lawyer: Lawyer
	let auth: string
	let lawyersOffering: Offering
	let othersOffering: Offering

	before(async () => {
		await truncateDatabase()
		lawyer = await generateLawyer({ isVerified: true })
		auth = createAuthToken({ id: lawyer.userId, role: AuthRole.LAWYER })

		lawyersOffering = await generateOffering({ lawyerId: lawyer.id })
		othersOffering = await generateOffering()
	})

	it(`Fail: deleting other lawyers offering`, async () => {
		await httpApiRequest({
			method,
			endpoint: getEndpoint(othersOffering.id),
			auth,
			expectedStatusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
		})

		const [offering] = await listOffering({ filter: { id: othersOffering.id } })
		expect(offering).exist
	})

	it(`Success`, async () => {
		const res = await httpApiRequest({
			method,
			endpoint: getEndpoint(lawyersOffering.id),
			auth,
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})
		expect(res).empty

		const [offering] = await listOffering({ filter: { id: lawyersOffering.id } })
		expect(offering).not.exist
	})
})
