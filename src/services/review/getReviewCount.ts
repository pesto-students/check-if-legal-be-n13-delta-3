import { ReviewPaymentStatus, ReviewStatus } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function getReviewCount({
	userId,
	lawyerId,
	paperTypeId,
	status,
	cityId,
	languageId,
	isPaymentPaid,
}: {
	userId?: number
	lawyerId?: number
	cityId?: number
	languageId?: number
	paperTypeId?: number
	status?: ReviewStatus
	isPaymentPaid?: boolean
} = {}): Promise<number> {
	return await prisma.review.count({
		where: {
			...(userId && { userId }),
			...(lawyerId && { lawyerId }),
			...(cityId && { lawyer: { cityId } }),
			...(paperTypeId && { paperTypeId }),
			...(languageId && { languageId }),
			...(status && { status }),
			...(isPaymentPaid && { payment: { status: ReviewPaymentStatus.PAID } }),
		},
	})
}
