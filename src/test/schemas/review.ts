import { expect } from "chai"

export function expectReviewSchema(
	data: any,
	include?: { user?: boolean; lawyer?: boolean; rating?: boolean; feedbacks?: boolean },
) {
	expect(data).to.be.an("object")
	expect(data).to.have.keys(
		"id",
		"createdAt",
		"updatedAt",
		"userId",
		"lawyerId",
		"paperTypeId",
		"paperType",
		"languageId",
		"language",
		"cityId",
		"city",
		"userNote",
		"price",
		"expectedTimeInHours",
		"status",
		...(include?.user ? ["user"] : []),
		...(include?.lawyer ? ["lawyer"] : []),
		...(include?.rating ? ["rating"] : []),
		...(include?.feedbacks ? ["feedbacks"] : []),
	)
}
