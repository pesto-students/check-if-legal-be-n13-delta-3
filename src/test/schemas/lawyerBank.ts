import { expect } from "chai"

export function expectLawyerBankSchema(data: any) {
	expect(data).to.be.an("object")
	expect(data).to.have.keys(
		"id",
		"createdAt",
		"updatedAt",
		"bankName",
		"bankIfsc",
		"accountNumber",
		"lawyerId",
	)
}
