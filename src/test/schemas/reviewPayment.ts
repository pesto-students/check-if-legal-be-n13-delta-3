import { expect } from "chai"

export function expectReviewPaymentSchema(data: any) {
	expect(data).to.be.an("object")
	expect(data).to.have.keys(
		"id",
		"createdAt",
		"updatedAt",
		"reviewId",
		"orderId",
		"amountInPaisa",
		"status",
	)
}
