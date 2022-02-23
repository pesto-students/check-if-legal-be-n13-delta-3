import { UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"
import { listReviewRating } from "./listReviewRating"

export async function deleteReviewRating({
	reviewId,
}: {
	reviewId: number
}): Promise<void> {
	const [reviewRating] = await listReviewRating({ filter: { reviewId } })
	if (!reviewRating) {
		throw new UnprocessableEntityError("Invalid review rating")
	}

	await prisma.reviewRating.delete({ where: { reviewId } })
}
