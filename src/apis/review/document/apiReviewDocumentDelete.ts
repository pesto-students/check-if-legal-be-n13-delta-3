import path from "path"
import { z } from "zod"
import { AuthRole } from "../../../core/enums"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { getReviewDocsDirPath } from "../../../helpers/directoryPaths"
import { deleteFile } from "../../../helpers/fs"
import { listReview } from "../../../services/review/listReview"
import { getUserOrLawyerFromAuth } from "../../../services/user/getUserOrLawyerFromAuth"

export const apiReviewDocumentDelete = new HttpApi({
	method: HttpMethod.DELETE,
	endpoint: "/review/:reviewId/document/:fileName",
	paramsSchema: z.object({ reviewId: z.string(), fileName: z.string() }).strict(),
	handler: async ({ req, params }) => {
		const authPayload = userAuth(req, [AuthRole.USER, AuthRole.LAWYER])
		const { userId, lawyerId } = await getUserOrLawyerFromAuth(authPayload)

		const reviewId = +params.reviewId
		const [review] = await listReview({ filter: { id: reviewId, userId, lawyerId } })
		if (!review) throw new UnprocessableEntityError("Review not found")

		const dirPath = getReviewDocsDirPath(review.id)
		const filePath = path.join(dirPath, params.fileName)
		await deleteFile(filePath)
	},
})
