import { expect } from "chai"

export function expectReviewRatingSchema(data: any) {
	expect(data).to.be.an("object")
	expect(data).to.have.keys(
		"id",
		"createdAt",
		"updatedAt",
		"comment",
		"rating",
		"reviewId",
		"review",
	)
}
