import path from "path"

export function getLawyerIdProofsDirPath(lawyerId: number) {
	return path.join("storage", "lawyer", lawyerId.toString(), "idProofs")
}

export function getReviewDocsDirPath(reviewId: number) {
	return path.join("storage", "review", reviewId.toString(), "docs")
}
