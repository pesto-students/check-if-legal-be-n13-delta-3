import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateCity } from "../../test/resources/city"
import { generateLawyer } from "../../test/resources/lawyer"
import { generateOffering } from "../../test/resources/offering"
import { generateUser } from "../../test/resources/user"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.GET
const endpoint = "/user/offering"

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
		const cityId = (await generateCity()).id
		const lawyerId = (await generateLawyer({ cityId, isVerified: true })).id
		const { paperTypeId, languageId } = await generateOffering({ lawyerId })

		const res = await httpApiRequest({
			method,
			endpoint,
			auth,
			body: { paperTypeId, cityId, languageId },
		})
		expect(res).exist
	})
})
