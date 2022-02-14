import { Review } from "@prisma/client"
import { sanitizeLawyer } from "../lawyer/sanitizeLawyer"
import { sanitizeUser } from "../user/sanitizeUser"

export function sanitizeReview(review: Review) {
	// @ts-ignore
	if (review.user) review.user = sanitizeUser(review.user)
	// @ts-ignore
	if (review.lawyer) review.lawyer = sanitizeLawyer(review.lawyer)

	return review
}
