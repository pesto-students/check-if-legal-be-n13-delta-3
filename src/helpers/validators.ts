import { BadRequestError } from "../core/http"

export function validateRating(rating: number): void {
	if (rating < 1 || rating > 5) {
		throw new BadRequestError("Invalid rating")
	}
}
