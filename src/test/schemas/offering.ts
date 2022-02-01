import { expect } from "chai"

export function expectOfferingSchema(data: any, include?: { lawyer?: boolean }) {
	expect(data).to.be.an("object")
	expect(data).to.have.keys(
		"id",
		"createdAt",
		"updatedAt",
		"lawyerId",
		"paperTypeId",
		"paperType",
		"languageId",
		"language",
		"price",
		"expectedTimeInHours",
		"isAvailable",
		"description",
		...(include?.lawyer ? ["lawyer"] : []),
	)
}
