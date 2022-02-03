import { ReviewPayment, ReviewStatus } from "@prisma/client"
import { ConflictError, UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"
import { createRazorpayOrder } from "../../helpers/razorpay/createRazorpayOrder"
import { parseReviewPaymentStatus } from "../../helpers/razorpay/parseReviewPaymentStatus"

export async function createReviewPayment({
	reviewId,
}: {
	reviewId: number
}): Promise<ReviewPayment> {
	const review = await prisma.review.findFirst({
		where: { id: reviewId },
		include: { payment: true },
	})
	if (!review) {
		throw new UnprocessableEntityError("Invalid review")
	}
	if (review.status === ReviewStatus.CLOSED) {
		throw new ConflictError("Review is closed")
	}
	if (review.payment) {
		throw new ConflictError("Payment request already created for this Review")
	}

	const razorpayOrder = await createRazorpayOrder({
		amountInPaisa: review.price * 100,
		receipt: reviewId.toString(),
	})
	const status = parseReviewPaymentStatus(razorpayOrder.status)

	return await prisma.reviewPayment.create({
		data: {
			reviewId,
			amountInPaisa: razorpayOrder.amount,
			orderId: razorpayOrder.id,
			status,
		},
	})
}
