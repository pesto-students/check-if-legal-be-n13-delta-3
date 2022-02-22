import { randAccount, randBrand } from "@ngneat/falso"
import { Lawyer } from "@prisma/client"
import { expect } from "chai"
import { AuthRole } from "../../../core/enums"
import { HttpMethod, HttpStatusCode } from "../../../core/http"
import { createAuthToken } from "../../../helpers/auth/authToken"
import { getLawyerBank } from "../../../services/lawyerBank/getLawyerBank"
import { httpApiRequest } from "../../../test/httpApiRequest"
import { randomBankIfsc } from "../../../test/resources/bank"
import { generateLawyer } from "../../../test/resources/lawyer"
import { truncateDatabase } from "../../../test/truncateDatabase"

const method = HttpMethod.PUT
const endpoint = "/lawyer/bank"

describe(`API: ${method} ${endpoint}`, () => {
	let lawyer: Lawyer
	let auth: string

	before(async () => {
		await truncateDatabase()
		lawyer = await generateLawyer({ isVerified: true })
		auth = createAuthToken({ id: lawyer.userId, role: AuthRole.LAWYER })
	})

	it(`Success: create new bank`, async () => {
		const bankName = randBrand()
		const bankIfsc = randomBankIfsc()
		const accountNumber = randAccount()

		await httpApiRequest({
			method,
			endpoint,
			auth,
			body: { bankName, bankIfsc, accountNumber },
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})

		const lawyerBank = await getLawyerBank({ lawyerId: lawyer.id })
		expect(lawyerBank).exist
		if (lawyerBank) {
			expect(lawyerBank.lawyerId).equal(lawyer.id)
			expect(lawyerBank.bankName).equal(bankName)
			expect(lawyerBank.bankIfsc).equal(bankIfsc)
			expect(lawyerBank.accountNumber).equal(accountNumber)
		}
	})

	it(`Success: update bank`, async () => {
		const bankName = randBrand()
		const bankIfsc = randomBankIfsc()
		const accountNumber = randAccount()

		await httpApiRequest({
			method,
			endpoint,
			auth,
			body: { bankName, bankIfsc, accountNumber },
			expectedStatusCode: HttpStatusCode.NO_CONTENT,
		})

		const lawyerBank = await getLawyerBank({ lawyerId: lawyer.id })
		expect(lawyerBank).exist
		if (lawyerBank) {
			expect(lawyerBank.lawyerId).equal(lawyer.id)
			expect(lawyerBank.bankName).equal(bankName)
			expect(lawyerBank.bankIfsc).equal(bankIfsc)
			expect(lawyerBank.accountNumber).equal(accountNumber)
		}
	})
})
