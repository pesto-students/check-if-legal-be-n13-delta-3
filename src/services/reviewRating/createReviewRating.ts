import { ReviewRating, ReviewStatus } from "@prisma/client"
import { UnprocessableEntityError } from "../../core/http"
import { prisma } from "../../core/prisma"
import { validateRating } from "../../helpers/validators"

export async function createReviewRating({
	reviewId,
	comment,
	rating,
}: {
	reviewId: number
	comment: string
	rating: number
}): Promise<ReviewRating> {
	validateRating(rating)

	const review = await prisma.review.findFirst({ where: { id: reviewId } })
	if (!review) throw new UnprocessableEntityError("Invalid review")

	const isReviewClosed = review.status === ReviewStatus.CLOSED
	if (!isReviewClosed) {
		throw new UnprocessableEntityError("Ratings are only allowed in closed reviews")
	}

	return await prisma.reviewRating.create({ data: { reviewId, rating, comment } })
}
