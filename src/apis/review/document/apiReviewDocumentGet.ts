import path from "path"
import { z } from "zod"
import { AuthRole } from "../../../core/enums"
import { HttpApi, HttpMethod, UnprocessableEntityError } from "../../../core/http"
import { userAuth } from "../../../helpers/auth/userAuth"
import { getReviewDocsDirPath } from "../../../helpers/directoryPaths"
import { decryptFile } from "../../../helpers/encrypt"
import { listReview } from "../../../services/review/listReview"
import { getUserOrLawyerFromAuth } from "../../../services/user/getUserOrLawyerFromAuth"

export const apiReviewDocumentGet = new HttpApi({
	method: HttpMethod.GET,
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

		const decryptedFileBuffer = await decryptFile(filePath)
		const base64File = decryptedFileBuffer.toString("base64")
		return { base64File }
	},
})
