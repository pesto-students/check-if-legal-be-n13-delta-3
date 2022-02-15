import { z } from "zod"
import { AuthRole } from "../../../core/enums"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { getReviewDocsDirPath } from "../../../helpers/directoryPaths"
import { getDirFiles } from "../../../helpers/fs"
import { listReview } from "../../../services/review/listReview"
import { getUserOrLawyerFromAuth } from "../../../services/user/getUserOrLawyerFromAuth"

export const apiReviewDocumentList = new HttpApi({
	method: HttpMethod.GET,
	endpoint: "/review/:reviewId/document",
	paramsSchema: z.object({ reviewId: z.string() }).strict(),
	handler: async ({ req, params }) => {
		const authPayload = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { userId, lawyerId } = await getUserOrLawyerFromAuth(authPayload)

		const reviewId = +params.reviewId
		const [review] = await listReview({ filter: { id: reviewId, userId, lawyerId } })
		if (!review) throw new UnprocessableEntityError("Review not found")

		let fileNames: string[] = []
		try {
			const dirPath = getReviewDocsDirPath(review.id)
			fileNames = await getDirFiles(dirPath)
		} catch (err) {
			return []
		}

		return fileNames
	},
})
