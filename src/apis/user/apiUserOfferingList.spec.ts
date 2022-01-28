import { expect } from "chai"
import { createAuthToken } from "../../core/auth"
import { AuthRole } from "../../core/enums"
import { HttpMethod } from "../../core/http"
import { httpApiRequest } from "../../core/test/httpApiRequest"
import { generateCity } from "../../core/test/resources/city"
import { generateLawyer } from "../../core/test/resources/lawyer"
import { generateOffering } from "../../core/test/resources/offering"
import { generateUser } from "../../core/test/resources/user"
import { truncateDatabase } from "../../core/test/truncateDatabase"

const method = HttpMethod.POST
const endpoint = "/user/offering/list"

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
