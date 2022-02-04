import { ReviewStatus } from "@prisma/client"
import { ConflictError, UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"

export async function deleteReview({ id }: { id: number }): Promise<void> {
	const review = await prisma.review.findFirst({ where: { id } })
	if (!review) throw new UnprocessableEntityError("Invalid review")

	const isReviewCancelable = review.status === ReviewStatus.INITIAL || review.status
	ReviewStatus.WAITING_FOR_PAYMENT
	if (!isReviewCancelable) {
		throw new ConflictError("Review cannot be cancelled")
	}

	await prisma.review.delete({ where: { id } })
}
