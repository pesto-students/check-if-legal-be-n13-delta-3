import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listPaperType } from "../../services/paperType/listPaperType"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateAdmin } from "../../test/resources/admin"
import { getAvailablePaperTypeName } from "../../test/resources/paperType"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.POST
const endpoint = "/paperType"

describe(`API: ${method} ${endpoint}`, () => {
	let auth: string
	let name: string

	before(async () => {
		await truncateDatabase()
		const admin = await generateAdmin()
		auth = createAuthToken({ id: admin.id, role: AuthRole.ADMIN })
		name = await getAvailablePaperTypeName()
	})

	/**
	 * Authentication
	 */
	it(`Authentication: Fail without token`, async () => {
		await httpApiRequest({
			method,
			endpoint,
			body: { name },
			expectedStatusCode: HttpStatusCode.FORBIDDEN,
		})
	})

	/**
	 * Success Cases
	 */
	it(`Success`, async () => {
		const res = await httpApiRequest({
			method,
			endpoint,
			auth,
			body: { name },
			expectedStatusCode: HttpStatusCode.CREATED,
		})
		expect(res).exist
		expect(res.id).exist

		const [paperType] = await listPaperType({ filter: { id: res.id } })
		expect(paperType).exist
		expect(paperType.id).equal(res.id)
		expect(paperType.name).equal(name)
	})

	/**
	 * Fail Cases
	 */
	it(`Fail: with already exists paperType name`, async () => {
		await httpApiRequest({
			method,
			endpoint,
			auth,
			body: { name },
			expectedStatusCode: HttpStatusCode.CONFLICT,
		})
	})
})
