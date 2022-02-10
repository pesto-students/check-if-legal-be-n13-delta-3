import { State } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listState } from "../../services/state/listState"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateAdmin } from "../../test/resources/admin"
import { generateCity } from "../../test/resources/city"
import { generateState } from "../../test/resources/state"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.DELETE
function getEndpoint(stateId: number | string) {
	return `/state/${stateId}`
}

describe(`API: ${getEndpoint(":id")}`, () => {
	let auth: string
	let states: State[]

	before(async () => {
		await truncateDatabase()
		const admin = await generateAdmin()
		auth = createAuthToken({ id: admin.id, role: AuthRole.ADMIN })

		states = [await generateState(), await generateState(), await generateState()]
	})

	/**
	 * Authentication
	 */
	it(`Authentication: Fail without token`, async () => {
		await httpApiRequest({
			method,
			endpoint: getEndpoint(states[0].id),
			expectedStatusCode: HttpStatusCode.FORBIDDEN,
		})
	})

	/**
	 * Success Cases
	 */
	it(`Success`, async () => {
		let countStates = states.length
		for (const state of states) {
			const res = await httpApiRequest({
				method,
				endpoint: getEndpoint(state.id),
				auth,
				expectedStatusCode: HttpStatusCode.NO_CONTENT,
			})
			expect(res).empty

			const [[deletedState], stateList] = await Promise.all([
				listState({ filter: { id: state.id } }),
				listState(),
			])
			expect(deletedState).not.exist
			expect(stateList).length(--countStates)
		}
	})

	/**
	 * Fail Cases
	 */
	it(`Fail: deleting state with city`, async () => {
		const state = await generateState()
		await generateCity({ stateId: state.id })

		await httpApiRequest({
			method,
			endpoint: getEndpoint(state.id),
			auth,
			expectedStatusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
		})
	})

	it(`Fail: deleting invalid state`, async () => {
		await httpApiRequest({
			method,
			endpoint: getEndpoint(states[0].id),
			auth,
			expectedStatusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
		})
	})
})
