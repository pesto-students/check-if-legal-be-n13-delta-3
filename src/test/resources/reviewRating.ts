import { randJobDescriptor, randNumber } from "@ngneat/falso"
import { ReviewStatus } from "@prisma/client"
import { updateReview } from "../../services/review/updateReview"
import { createReviewRating } from "../../services/reviewRating/createReviewRating"
import { generateReview } from "./review"

export async function generateReviewRating({
	reviewId,
	userId,
	lawyerId,
}: { reviewId?: number; userId?: number; lawyerId?: number } = {}) {
	if (!reviewId) {
		reviewId = (await generateReview({ userId, lawyerId })).id
	}
	await updateReview({
		filter: { id: reviewId },
		update: { status: ReviewStatus.CLOSED },
	})

	const rating = randNumber({ min: 1, max: 5 })
	const comment = randJobDescriptor()

	return await createReviewRating({ reviewId, rating, comment })
}
