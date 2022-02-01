import { expect } from "chai"

export function expectReviewFeedbackSchema(data: any) {
	expect(data).to.be.an("object")
	expect(data).to.have.keys(
		"id",
		"createdAt",
		"updatedAt",
		"description",
		"byLawyer",
		"reviewId",
	)
}
