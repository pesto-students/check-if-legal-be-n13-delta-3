import { ReviewFeedback, ReviewStatus } from "@prisma/client"
import { ConflictError, UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"

export async function createReviewFeedback({
	reviewId,
	description,
	byLawyer,
}: {
	reviewId: number
	description: string
	byLawyer: boolean
}): Promise<ReviewFeedback> {
	const review = await prisma.review.findFirst({ where: { id: reviewId } })
	if (!review) throw new UnprocessableEntityError("Invalid review")

	const isReviewClosed = review.status === ReviewStatus.CLOSED
	if (isReviewClosed) throw new ConflictError("Update not allowed in closed review")

	return await prisma.reviewFeedback.create({
		data: { reviewId, description, byLawyer },
	})
}
