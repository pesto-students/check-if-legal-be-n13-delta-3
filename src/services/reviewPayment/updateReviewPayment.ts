import { ReviewPayment, ReviewPaymentStatus, ReviewStatus } from "@prisma/client"
import { UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"
import { fetchRazorpayOrder } from "../../helpers/razorpay/fetchRazorpayOrder"
import { parseReviewPaymentStatus } from "../../helpers/razorpay/parseReviewPaymentStatus"
import { getReviewPayment } from "./getReviewPayment"

export async function updateReviewPaymentStatus({
	reviewId,
}: {
	reviewId: number
}): Promise<ReviewPayment> {
	const reviewPayment = await getReviewPayment({ reviewId })
	if (!reviewPayment) {
		throw new UnprocessableEntityError("Invalid review payment")
	}
	if (reviewPayment.status === ReviewPaymentStatus.PAID) {
		throw new UnprocessableEntityError("Review payment is paid")
	}

	const razorpayOrder = await fetchRazorpayOrder({ orderId: reviewPayment.orderId })

	const status = parseReviewPaymentStatus(razorpayOrder.status)
	if (status === ReviewPaymentStatus.PAID) {
		await prisma.review.update({
			where: { id: reviewId },
			data: { status: ReviewStatus.PENDING_FOR_REVIEW },
		})
	}

	return await prisma.reviewPayment.update({
		where: { reviewId },
		data: { status },
	})
}
