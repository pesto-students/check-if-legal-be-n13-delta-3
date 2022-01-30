import { randPassword, randUserName } from "@ngneat/falso"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateAdmin } from "../../test/resources/admin"
import { truncateDatabase } from "../../test/truncateDatabase"
import { Unpromise } from "../../core/types"
import { validateAuthToken } from "../../helpers/auth/authToken"

const method = HttpMethod.POST
const endpoint = "/admin/login"

describe(`API: ${endpoint}`, () => {
	let admin: Unpromise<ReturnType<typeof generateAdmin>>

	before(async () => {
		await truncateDatabase()
		admin = await generateAdmin()
	})

	/**
	 * Validation
	 */
	it(`Validation: Fail without username`, async () => {
		await httpApiRequest({
			method,
			endpoint,
			body: { password: admin.password },
			expectedStatusCode: HttpStatusCode.BAD_REQUEST,
		})
	})
	it(`Validation: Fail without password`, async () => {
		await httpApiRequest({
			method,
			endpoint,
			body: { username: admin.username },
			expectedStatusCode: HttpStatusCode.BAD_REQUEST,
		})
	})

	/**
	 * Fail cases
	 */
	it(`Fail with wrong username`, async () => {
		const username = randUserName()
		const password = admin.password

		await httpApiRequest({
			method,
			endpoint,
			body: { username, password },
			expectedStatusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
		})
	})

	it(`Fail with wrong password`, async () => {
		const username = admin.username
		const password = randPassword()

		await httpApiRequest({
			method,
			endpoint,
			body: { username, password },
			expectedStatusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
		})
	})

	/**
	 * Success cases
	 */
	it(`Success with right credentials`, async () => {
		const { id, username, password } = admin

		const res = await httpApiRequest({
			method,
			endpoint,
			body: { username, password },
		})
		expect(res).exist
		expect(res.token).exist

		const authPayload = validateAuthToken(res.token)
		expect(authPayload.id).equal(id)
		expect(authPayload.role).equal(AuthRole.ADMIN)
	})
})
