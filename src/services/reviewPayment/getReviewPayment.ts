import { ReviewPayment } from "@prisma/client"
import { prisma } from "../../core/prisma"

export async function getReviewPayment({
	reviewId,
}: {
	reviewId: number
}): Promise<ReviewPayment | null> {
	return await prisma.reviewPayment.findFirst({ where: { reviewId } })
}
