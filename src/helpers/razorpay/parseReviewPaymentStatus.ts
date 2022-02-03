import { ReviewPaymentStatus } from "@prisma/client"
import { RazorpayOrderStatus } from "./RazorpayOrderStatus"

export function parseReviewPaymentStatus(
	razorpayOrderStatus: RazorpayOrderStatus,
): ReviewPaymentStatus {
	if (razorpayOrderStatus === RazorpayOrderStatus.CREATED) {
		return ReviewPaymentStatus.CREATED
	} else if (razorpayOrderStatus === RazorpayOrderStatus.ATTEMPTED) {
		return ReviewPaymentStatus.ATTEMPTED
	} else if (razorpayOrderStatus === RazorpayOrderStatus.PAID) {
		return ReviewPaymentStatus.PAID
	} else {
		throw new Error("Invalid razorpay order status")
	}
}
