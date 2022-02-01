import { randJobDescriptor } from "@ngneat/falso"
import { createReviewFeedback } from "../../services/reviewFeedback/createReviewFeedback"
import { generateReview } from "./review"

export async function generateReviewFeedback({
	reviewId,
	byLawyer,
}: {
	reviewId?: number
	byLawyer?: boolean
} = {}) {
	if (!reviewId) reviewId = (await generateReview()).id
	byLawyer = byLawyer ?? false
	const description = randJobDescriptor()

	return await createReviewFeedback({ reviewId, byLawyer, description })
}
