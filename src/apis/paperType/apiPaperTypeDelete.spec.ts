import { PaperType } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listPaperType } from "../../services/paperType/listPaperType"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateAdmin } from "../../test/resources/admin"
import { generatePaperType } from "../../test/resources/paperType"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.DELETE
function getEndpoint(paperTypeId: number | string) {
	return `/paperType/${paperTypeId}`
}

describe(`API: ${method} ${getEndpoint(":id")}`, () => {
	let auth: string
	let paperTypes: PaperType[]

	before(async () => {
		await truncateDatabase()
		const admin = await generateAdmin()
		auth = createAuthToken({ id: admin.id, role: AuthRole.ADMIN })

		paperTypes = [
			await generatePaperType(),
			await generatePaperType(),
			await generatePaperType(),
		]
	})

	/**
	 * Authentication
	 */
	it(`Authentication: Fail without token`, async () => {
		await httpApiRequest({
			method,
			endpoint: getEndpoint(paperTypes[0].id),
			expectedStatusCode: HttpStatusCode.FORBIDDEN,
		})
	})

	/**
	 * Success Cases
	 */
	it(`Success`, async () => {
		let countPaperTypes = paperTypes.length
		for (const paperType of paperTypes) {
			const res = await httpApiRequest({
				method,
				endpoint: getEndpoint(paperType.id),
				auth,
				expectedStatusCode: HttpStatusCode.NO_CONTENT,
			})
			expect(res).empty

			const [[deletedPaperType], paperTypeList] = await Promise.all([
				listPaperType({ filter: { id: paperType.id } }),
				listPaperType(),
			])
			expect(deletedPaperType).not.exist
			expect(paperTypeList).length(--countPaperTypes)
		}
	})

	/**
	 * Fail Cases
	 */
	it(`Fail: deleting invalid paperType`, async () => {
		await httpApiRequest({
			method,
			endpoint: getEndpoint(paperTypes[0].id),
			auth,
			expectedStatusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
		})
	})
})
