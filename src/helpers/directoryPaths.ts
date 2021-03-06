import path from "path"

export function getLawyerPictureDirPath() {
	return path.join("static", "lawyerPictures")
}

export function getLawyerProofDirPath(lawyerId: number) {
	return path.join("storage", "lawyer", lawyerId.toString(), "proofs")
}

export function getReviewDocsDirPath(reviewId: number) {
	return path.join("storage", "review", reviewId.toString(), "docs")
}
