import { Lawyer } from "@prisma/client"
import { expect } from "chai"
import _ from "lodash"
import { AuthRole } from "../../core/enums"
import { HttpMethod } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateAdmin } from "../../test/resources/admin"
import { generateLawyer } from "../../test/resources/lawyer"
import { expectLawyerSchema } from "../../test/schemas/lawyer"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.GET
const endpoint = "/lawyer"

describe(`API: ${endpoint}`, () => {
	let auth: string
	let lawyers: Lawyer[]

	before(async () => {
		await truncateDatabase()
		const admin = await generateAdmin()
		auth = createAuthToken({ id: admin.id, role: AuthRole.ADMIN })

		lawyers = [
			await generateLawyer(),
			await generateLawyer(),
			await generateLawyer({ isVerified: false }),
			await generateLawyer({ isSuspended: false }),
			await generateLawyer({ isSuspended: false, isVerified: false }),
		]
	})

	for (const isVerified of [undefined, true, false]) {
		for (const isSuspended of [undefined, true, false]) {
			const caseDesc = `Success with filters: isVerified(${isVerified}) & isSuspended(${isSuspended})`
			it(caseDesc, async () => {
				const res = await httpApiRequest({
					method,
					endpoint,
					auth,
					body: { isVerified, isSuspended },
				})
				expect(res).exist
				for (const el of res) {
					expectLawyerSchema(el, AuthRole.ADMIN)
				}

				let expectedListCount = lawyers.length
				let filteredList = lawyers
				if (_.isBoolean(isVerified)) {
					filteredList = filteredList.filter(
						(el) => el.isVerified === isVerified,
					)
					expectedListCount = filteredList.length
				}
				if (_.isBoolean(isSuspended)) {
					filteredList = filteredList.filter(
						(el) => el.isSuspended === isSuspended,
					)
					expectedListCount = filteredList.length
				}

				expect(res.length).equal(expectedListCount)
			})
		}
	}
})
