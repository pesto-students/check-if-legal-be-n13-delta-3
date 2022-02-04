import {
	randFullName,
	randJobDescriptor,
	randPhoneNumber,
	randStreetAddress,
} from "@ngneat/falso"
import { expect } from "chai"
import { AuthRole } from "../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../core/http"
import { createAuthToken } from "../../helpers/auth/authToken"
import { listLawyer } from "../../services/lawyer/listLawyer"
import { httpApiRequest } from "../../test/httpApiRequest"
import { generateCity } from "../../test/resources/city"
import { generateUser } from "../../test/resources/user"
import { truncateDatabase } from "../../test/truncateDatabase"

const method = HttpMethod.POST
const endpoint = "/lawyer/register"

describe(`API: ${endpoint}`, () => {
	let userId: number
	let auth: string

	before(async () => {
		await truncateDatabase()
		userId = (await generateUser({ isLawyer: true })).id
		auth = createAuthToken({ id: userId, role: AuthRole.LAWYER })
	})

	/**
	 * Fail cases
	 */
	it(`Fail`)

	/**
	 * Success cases
	 */
	it(`Success`, async () => {
		const cityId = (await generateCity()).id
		const name = randFullName()
		const address = randStreetAddress()
		const description = randJobDescriptor()
		const phone = randPhoneNumber()

		const res = await httpApiRequest({
			method,
			endpoint,
			auth,
			body: { cityId, name, address, description, phone },
			expectedStatusCode: HttpStatusCode.CREATED,
		})
		expect(res).exist
		expect(res.id).exist

		const [lawyer] = await listLawyer({ filter: { id: res.id } })
		expect(lawyer).exist
		expect(lawyer.id).equal(res.id)
		expect(lawyer.name).equal(name)
		expect(lawyer.address).equal(address)
		expect(lawyer.description).equal(description)
		expect(lawyer.phone).equal(phone)
		expect(lawyer.cityId).equal(cityId)
		expect(lawyer.isAvailable).equal(true)
		expect(lawyer.isSuspended).equal(false)
		expect(lawyer.isVerified).equal(false)
	})
})
