// import { randAccount, randBrand } from "@ngneat/falso"
// import { Lawyer } from "@prisma/client"
// import { expect } from "chai"
// import { AuthRole } from "../../../core/enums"
// import { HttpMethod, HttpStatusCode } from "../../../core/http"
// import { createAuthToken } from "../../../helpers/auth/authToken"
// import { httpApiRequest } from "../../../test/httpApiRequest"
// import { randomBankIfsc } from "../../../test/resources/bank"
// import { generateLawyer } from "../../../test/resources/lawyer"
// import { truncateDatabase } from "../../../test/truncateDatabase"

// const method = HttpMethod.POST
// const endpoint = "/lawyer/bank"

// describe(`API: ${method} ${endpoint}`, () => {
// 	let lawyer: Lawyer
// 	let auth: string

// 	before(async () => {
// 		await truncateDatabase()
// 		lawyer = await generateLawyer({ isVerified: true })
// 		auth = createAuthToken({ id: lawyer.userId, role: AuthRole.LAWYER })
// 	})

// 	it(`Success`, async () => {
// 		const bankName = randBrand()
// 		const bankIfsc = randomBankIfsc()
// 		const accountNumber = randAccount()

// 		const res = await httpApiRequest({
// 			method,
// 			endpoint,
// 			auth,
// 			body: { bankName, bankIfsc, accountNumber },
// 			expectedStatusCode: HttpStatusCode.CREATED,
// 		})
// 		expect(res).exist
// 		expect(res.id).exist

// 		const [lawyerBank] = await listLawyerBank({ filter: { id: res.id } })
// 		expect(lawyerBank).exist
// 		expect(lawyerBank.id).equal(res.id)
// 		expect(lawyerBank.lawyerId).equal(lawyer.id)
// 		expect(lawyerBank.bankName).equal(bankName)
// 		expect(lawyerBank.bankIfsc).equal(bankIfsc)
// 		expect(lawyerBank.accountNumber).equal(accountNumber)
// 	})
// })
