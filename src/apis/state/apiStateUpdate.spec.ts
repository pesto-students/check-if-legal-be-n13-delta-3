import { randState } from "@ngneat/falso"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listState } from "../../services/state/listState"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateAdmin } from "../../test/resources/admin"
import { generateState } from "../../test/resources/state"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.PATCH
function getEndpoint(stateId: number | string) {
	return `/state/${stateId}`
}

describe(`API: ${getEndpoint(":id")}`, () => {
	let auth: string
	let stateId: number

	before(async () => {
		await truncateDatabase()
		const admin = await generateAdmin()
		auth = createAuthToken({ id: admin.id, role: AuthRole.ADMIN })

		stateId = (await generateState()).id
	})

	/**
	 * Authentication
	 */
	it(`Authentication: Fail without token`, async () => {
		const name = randState()

		await httpApiRequest({
			method,
			endpoint: getEndpoint(stateId),
			expectedStatusCode: HttpStatusCode.FORBIDDEN,
			body: { name },
		})
	})

	/**
	 * Success Cases
	 */
	it(`Success`, async () => {
		const name = randState()

		const res = await httpApiRequest({
			method,
			endpoint: getEndpoint(stateId),
			auth,
			body: { name },
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})
		expect(res).empty

		const [state] = await listState({ filter: { id: stateId } })
		expect(state).exist
		expect(state.id).equal(stateId)
		expect(state.name).equal(name)
	})

	/**
	 * Fail Cases
	 */
	it(`Fail: updating already exist state name`, async () => {
		const state2 = await generateState()

		await httpApiRequest({
			method,
			endpoint: getEndpoint(stateId),
			auth,
			body: { name: state2.name },
			expectedStatusCode: HttpStatusCode.CONFLICT,
		})
	})
})
