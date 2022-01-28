import { ReviewStatus } from "@prisma/client"
import { ForbiddenError, UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"

export async function deleteReviewFeedback({
	filter,
}: {
	filter: { id: number }
}): Promise<void> {
	const reviewFeedback = await prisma.reviewFeedback.findFirst({
		where: filter,
		include: { review: true },
	})
	if (!reviewFeedback) throw new UnprocessableEntityError("Invalid review feedback")

	const isReviewClosed = reviewFeedback.review.status === ReviewStatus.CLOSED
	if (isReviewClosed) throw new ForbiddenError("Update not allowed in closed review")

	await prisma.reviewFeedback.delete({ where: filter })
}
