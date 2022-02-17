import path from "path"

export function getLawyerPictureDirPath(lawyerId: number) {
	return path.join("static", "lawyer", lawyerId.toString())
}

export function getLawyerProofDirPath(lawyerId: number) {
	return path.join("storage", "lawyer", lawyerId.toString(), "proofs")
}

export function getReviewDocsDirPath(reviewId: number) {
	return path.join("storage", "review", reviewId.toString(), "docs")
}
